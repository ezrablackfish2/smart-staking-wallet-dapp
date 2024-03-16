const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", () => {
  async function deployWalletFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Wallet = await ethers.getContractFactory("Wallet");
    const wallet = await Wallet.deploy();

    await wallet.waitForDeployment();

    return { wallet, owner, otherAccount };
  }

  it("Deployment is complete", async () => {
    const { wallet, owner } = await loadFixture(deployWalletFixture);
    expect(await wallet.owner()).to.equal(owner.address);
  });

  it("Check deposit and balanceOf func", async () => {
    const { wallet, owner } = await loadFixture(deployWalletFixture);
    const ETHVal = 100000;
    await wallet.deposit({ value: ETHVal, from: owner.address });
    const checkBalance = await wallet.balanceOf();
    expect(ETHVal).to.equal(ethers.toNumber(checkBalance));
  });

  it("Check withdraw", async () => {
    const { wallet, owner, otherAccount } = await loadFixture(
      deployWalletFixture
    );
    const ETHVal = 500000;
    const sendedVal = 20000;
    const balanceOld = await ethers.provider.getBalance(otherAccount.address);
    await wallet.deposit({ value: ETHVal, from: owner.address });
    await wallet.withdraw(otherAccount.address, sendedVal);
    const balanceNew = await ethers.provider.getBalance(otherAccount.address);
    expect(sendedVal).to.equal(balanceNew - balanceOld);
  });

  it("Only Owner Can withdraw", async () => {
    const { wallet, owner, otherAccount } = await loadFixture(
      deployWalletFixture
    );
    const sendedVal = 20000;
    await expect(
      wallet.connect(otherAccount).withdraw(otherAccount.address, sendedVal)
    ).to.be.revertedWith("Only owner can withdraw");
  });
});
