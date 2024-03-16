// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;


import "./Wallet.sol";
// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract StakingAET is ERC20{


    event CreateWallet(uint256 indexed _walletId, address _address);
    event DepositWallet(uint256 indexed _walletId, uint256 amount);
    event WithdrawWallet(uint256 indexed _walletId, address _to, uint256 amount);
    event StakingEthEvent(uint256 indexed _walletId, uint256 totalAmount);
    event UnStakingEthEvent(uint256 indexed _walletId);


    struct StakingWallet{
        Wallet wallet;
        uint256 stakedValue;
        uint256 sinceBlock;
        uint256 untilBlock;
        uint256 totalReward; 
    }
    
    uint256 public constant rewardAmountPerBlock = 10;
    mapping(uint256 => bool) public isStaked;
    mapping(address => uint256) public walletIDMapping;
    mapping(address => uint256[]) public wallets_mapping;

    StakingWallet[] public stakingWallets;
    
    constructor() ERC20("AEON Token" , "AET"){}

    function createWallet() public returns(uint256,address){
        Wallet wallet = new Wallet();
        stakingWallets.push(StakingWallet(wallet,0,0,0,0));
        uint256 walletId = stakingWallets.length - 1;
        emit CreateWallet(walletId, address(wallet));
        walletIDMapping[address(wallet)] = walletId;
        wallets_mapping[msg.sender].push(walletId);
        return (walletId,address(wallet));
    }

    
    function walletDeposit(uint256 _walletId) public payable onlyOwner(_walletId){
        StakingWallet storage wallet = stakingWallets[_walletId];
        wallet.wallet.deposit{value: msg.value}();
        emit DepositWallet(_walletId, msg.value);
    }

    function walletWithdraw(uint256 _walletId, address payable _to, uint256 amount) public onlyOwner(_walletId) {
        StakingWallet storage wallet = stakingWallets[_walletId];
        wallet.wallet.withdraw(_to,amount);
        emit WithdrawWallet(_walletId, _to, amount);
    }

    function walletBalance(uint256 _walletId) public view returns(uint256) {
        StakingWallet storage wallet = stakingWallets[_walletId];
        return wallet.wallet.balanceOf();
    }

    function calculateCurrentReward(uint256 _walletId) public view returns(uint256){
        StakingWallet memory wallet = stakingWallets[_walletId];
        uint256 stakedForBlocks = (block.timestamp - wallet.sinceBlock);
        uint256 totalUnclaimedRewards = (wallet.stakedValue *
            stakedForBlocks *
            rewardAmountPerBlock) / 100;   
        
        return (wallet.totalReward+totalUnclaimedRewards);
    }

    function currentStake(uint256 _walletId) public view returns(uint256){
      StakingWallet memory wallet = stakingWallets[_walletId];
      return wallet.stakedValue;
    }
    
    function getIsStaked(uint256 _walletId) public view returns(bool){
        return isStaked[_walletId];
    }

    function getWalletId(address walletAdr) public view returns(uint256){
        return walletIDMapping[walletAdr];
    }

    function getWallets() public view returns(uint256[] memory){
        return wallets_mapping[msg.sender];
    }

    
    function getWalletAdr(uint256 _walletId) public view returns(address){
        StakingWallet memory wallet = stakingWallets[_walletId];
        return address(wallet.wallet);
    }

    function StakingEth(uint256 _walletId, uint256 stakedAmount) public {
        StakingWallet storage wallet = stakingWallets[_walletId];
        uint256 currentBalance = wallet.wallet.balanceOf();
        require(currentBalance > stakedAmount, "Wallet Balance needs to be bigger stakedAmount");
        wallet.wallet.withdraw(payable(address(this)) , stakedAmount);

        uint256 totalUnclaimedRewards = calculateCurrentReward(_walletId);
    
        wallet.totalReward += totalUnclaimedRewards;
        wallet.sinceBlock = block.timestamp;
        wallet.untilBlock = 0;
        wallet.stakedValue += stakedAmount;
        isStaked[_walletId] = true;
        emit StakingEthEvent( _walletId, wallet.stakedValue);
    }


    function UnStake(uint256 _walletId) public onlyOwner(_walletId) {
        StakingWallet storage wallet = stakingWallets[_walletId];
        require(wallet.untilBlock == 0 , "Already unstaked");

        uint256 totalUnclaimedRewards = calculateCurrentReward(_walletId);
        _mint(msg.sender,totalUnclaimedRewards);
                payable(address(wallet.wallet)).transfer(wallet.stakedValue);


        wallet.totalReward = 0;
        wallet.sinceBlock = 0;
        wallet.untilBlock = block.timestamp;
        wallet.stakedValue = 0;
        isStaked[_walletId] = false;
        emit UnStakingEthEvent(_walletId);

    }


    receive() external payable {}
    fallback() external payable {}

    modifier onlyOwner(uint256 _walletId) {
        require(msg.sender != address(0) , "Not an valid address");
        StakingWallet memory wallet = stakingWallets[_walletId];
        require(wallet.wallet.owner() == msg.sender , "Not owner of the wallet");
        _;
    }


}