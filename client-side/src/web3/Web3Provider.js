import React, { useState, useEffect, useCallback } from "react";
import Web3Context from "./Web3-context.js";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { ContractInfo } from "../contract/ContractInfo.js";
import { useContractWrite } from "wagmi";
import Web3 from "web3";

const Web3Provider = (props) => {
  const [balance, setBalance] = useState(undefined);
  const [Wallets, setWallets] = useState([]);

  const [walletsIsLoading, setWalletsIsLoading] = useState(false);
  const [AETBalance, setAETBalance] = useState(0);
  const [totalStakedAdr, setTotalStakedAdr] = useState(0);
  const [totalStakedValue, setTotalStakedValue] = useState(0);

  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isDisconnected } = useAccount();

  // create Wallet
  const createWallet = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "createWallet",
  });

  const walletDeposit = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "walletDeposit",
  });

  const walletWithdraw = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "walletWithdraw",
  });

  const StakingEth = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "StakingEth",
  });

  const UnstakingEth = useContractWrite({
    address: ContractInfo.ADDRESS,
    abi: ContractInfo.ABI,
    functionName: "UnStake",
  });

  const walletConnect = () => {
    open({ view: "Networks" });
  };

  const createContractInstace = () => {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(
      ContractInfo.ABI,
      ContractInfo.ADDRESS
    );
    return contractInstance;
  };

  const getWallets = async () => {
    const contractInstance = createContractInstace();
    const wallets = await contractInstance.methods.getWallets().call({
      from: address,
    });

    return wallets;
  };

  const getWalletBalance = async (walletId) => {
    const contractInstance = createContractInstace();

    const walletBalance = await contractInstance.methods
      .walletBalance(walletId)
      .call({
        from: address,
      });
    return walletBalance;
  };

  const getAETBalance = async (walletAdr) => {
    const contractInstance = createContractInstace();
    const AETBalance = await contractInstance.methods
      .balanceOf(walletAdr)
      .call({ from: address });
    return AETBalance;
  };

  const getIsStake = async (walletId) => {
    const contractInstance = createContractInstace();
    const isStake = await contractInstance.methods
      .getIsStaked(walletId)
      .call({ from: address });
    return isStake;
  };

  const getCurrentStake = async (walletId) => {
    const contractInstance = createContractInstace();
    const currentStake = await contractInstance.methods
      .currentStake(walletId)
      .call({ from: address });
    return currentStake;
  };

  const getCurrentRewards = async (walletId) => {
    const contractInstance = createContractInstace();
    const curretRewards = await contractInstance.methods
      .calculateCurrentReward(walletId)
      .call({ from: address });
    return curretRewards;
  };

  const getTokenBalance = async (walletAdr) => {
    const contractInstance = createContractInstace();
    const tokenBalance = await contractInstance.methods
      .balanceOf(walletAdr)
      .call({ from: address });
    return tokenBalance;
  };

  const getWalletAdr = async (walletId) => {
    const contractInstance = createContractInstace();
    const walletAdr = contractInstance.methods
      .getWalletAdr(walletId)
      .call({ from: address });
    return walletAdr;
  };

  const disconnectWallet = async () => {
    disconnect();
  };

  const getAllWallets = async () => {
    setWalletsIsLoading(true);
    const web3 = new Web3(window.ethereum);
    const walletIDs = await getWallets();
    const walletsArr = [];

    const tokenBalance = await getAETBalance(address);
    const tokenBalanceEth = await web3.utils.fromWei(tokenBalance, "ether");

    setAETBalance(Number(tokenBalanceEth));

    let stakedAdr = 0;
    let stakedVal = 0;

    for (let i = 0; i < walletIDs.length; i++) {
      const walletId = Number(walletIDs[i]);
      const walletBalance = await getWalletBalance(walletId);
      const walletAdr = await getWalletAdr(walletId);
      const walletBalanceEth = await web3.utils.fromWei(walletBalance, "ether");

      // get AET balance
      const isStaked = await getIsStake(walletId);
      const currentStake = await getCurrentStake(walletId);
      const currentStakeEth = await web3.utils.fromWei(currentStake, "ether");
      const currentReward = await getCurrentRewards(walletId);
      const currentRewardEth = await web3.utils.fromWei(currentReward, "ether");

      if (isStaked) {
        stakedAdr++;
      }
      stakedVal += Number(currentStakeEth);

      const wallet = {
        walletId: walletId,
        walletAdr: walletAdr,
        currentBalance: Number(walletBalanceEth),
        withdraw: 123,
        IsStaked: isStaked,
        stake: 124,
        currentStake: Number(currentStakeEth),
        rewards: Number(currentRewardEth),
      };
      walletsArr.push(wallet);
    }

    setTotalStakedAdr(stakedAdr);
    setTotalStakedValue(stakedVal);
    setWallets(walletsArr);
    setWalletsIsLoading(false);
  };

  const getBalance = useCallback(
    async (web3) => {
      const balanceWei = await web3?.eth.getBalance(address);
      const balanceEth = web3?.utils.fromWei(balanceWei, "ether");
      const balance = Number(balanceEth).toFixed(4);
      setBalance(balance);
    },
    [address]
  );

  async function setWeb3Values() {
    const web3 = new Web3(window.ethereum);
    getBalance(web3);
  }

  useEffect(() => {
    if (!isDisconnected && address) {
      setWeb3Values();
    }
  }, [isDisconnected, address, getBalance]);

  const web3Context = {
    isConnected: !isDisconnected,
    address,
    balance,
    createWallet,
    walletDeposit,
    walletWithdraw,
    StakingEth,
    UnstakingEth,

    getWallets,
    walletsIsLoading,
    Wallets,

    AETBalance,
    totalStakedAdr,
    totalStakedValue,
    getAllWallets,
    getCurrentRewards,
    getCurrentStake,
    getIsStake,
    getAETBalance,
    getWalletBalance,
    getWallets,
    getWalletAdr,
    getTokenBalance,
    walletConnect,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={web3Context}>
      {props.children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
