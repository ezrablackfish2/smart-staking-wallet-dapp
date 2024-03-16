import React from "react";

const Web3Context = React.createContext({
  isConnected: false,
  address: undefined,
  balance: undefined,

  getWallets: undefined,
  Wallets: undefined,
  walletsIsLoading: false,
  walletDeposit: undefined,
  walletWithdraw: undefined,
  StakingEth: undefined,
  UnstakingEth: undefined,

  AETBalance: 0,
  totalStakedAdr: 0,
  totalStakedValue: 0,

  getAllWallets: () => {},
  getCurrentRewards: () => {},
  getCurrentStake: () => {},
  getIsStake: () => {},
  getAETBalance: () => {},
  getWalletBalance: () => {},
  getWalletAdr: () => {},
  getTokenBalance: () => {},
  walletConnect: () => {},
  disconnectWallet: () => {},
});

export default Web3Context;
