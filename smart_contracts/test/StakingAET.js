const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("StakingAET", () => {
  async function deployWalletFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const StakingAET = await ethers.getContractFactory("StakingAET");
    const stakingAET = await StakingAET.deploy();

    await stakingAET.waitForDeployment();

    return { stakingAET, owner, otherAccount };
  }

  it("Deployment is complete", async () => {
    const { stakingAET, owner } = await loadFixture(deployWalletFixture);
    const contractAdr = await stakingAET.target;
    assert.ok(contractAdr);
  });

  it("Create Wallet", async () => {
    const { stakingAET, owner } = await loadFixture(deployWalletFixture);
    const res = await stakingAET.createWallet();
    const wallets = await stakingAET.getWallets();
    const walletsLengt = wallets.length;
    expect(walletsLengt).to.equal(1);
  });

  it("Deposit Wallet", async () => {
    const VALUE = 1000000000;
    const { stakingAET, owner } = await loadFixture(deployWalletFixture);
    await stakingAET.createWallet();
    await stakingAET.walletDeposit(0, { value: VALUE });

    const walletBalance = await stakingAET.walletBalance(0);
    expect(Number(walletBalance)).to.equal(VALUE);
  });

  it("Staking ETH", async () => {
    const VALUE = 1000000000;
    const STAKINGVAL = 50000;
    const { stakingAET, owner } = await loadFixture(deployWalletFixture);
    await stakingAET.createWallet();
    await stakingAET.walletDeposit(0, { value: VALUE });
    await stakingAET.StakingEth(0, STAKINGVAL);
    const isStaked = await stakingAET.getIsStaked(0);
    assert.ok(isStaked);

    const stakingVal = await stakingAET.currentStake(0);
    expect(Number(stakingVal)).to.equal(STAKINGVAL);
  });
});
