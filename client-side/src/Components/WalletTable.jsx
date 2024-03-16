import React, { useState, useContext, useEffect } from "react";
import Web3Context from "../web3/Web3-context";
import Spinning from "../UI/Spinning";
import Table from "react-bootstrap/Table";
import Button from "../UI/Button";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import StakeModal from "./StakeModal";
import Reward from "./Reward";
import CurrentStake from "./CurrentStake";
import CopyIcon from "../UI/CopyIcon";
import walletAddressFormat from "../auxiliary/walletAddressFormar.js";

function WalletTable() {
  const web3Ctx = useContext(Web3Context);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showStakingModal, setShowStakingtModal] = useState(false);
  const [currentWallet, setCurrentWallet] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const clickCopyBoard = (value) => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    web3Ctx.getAllWallets();
  }, []);

  function deposit(walletID) {
    setCurrentWallet(walletID);
    setShowDepositModal(true);
  }

  function withdraw(walletID) {
    setCurrentWallet(walletID);
    setShowWithdrawModal(true);
  }

  function stake(walletID) {
    setCurrentWallet(walletID);
    setShowStakingtModal(true);
  }

  function closeModal() {
    setShowDepositModal(false);
    setShowWithdrawModal(false);
    setShowStakingtModal(false);
  }

  return (
    <React.Fragment>
      {web3Ctx.walletsIsLoading ? (
        <Spinning />
      ) : (
        <Table bordered hover bsPrefix="my-table">
          <thead>
            <tr
              style={{
                textAlign: "center",
              }}
            >
              <th>ID</th>
              <th>Wallet Adr</th>
              <th>Current Balance</th>
              <th>Deposit</th>
              <th>Withdraw</th>
              <th>Is Staked</th>
              <th>Stake</th>
              <th>Current Stake</th>
              <th>Rewards</th>
            </tr>
          </thead>
          <tbody>
            {web3Ctx.Wallets.map((item) => {
              return (
                <tr
                  style={{
                    textAlign: "center",
                  }}
                  key={item.walletId}
                >
                  <td>{item.walletId}</td>
                  <td>
                    {walletAddressFormat(item.walletAdr)}
                    <CopyIcon
                      onClick={clickCopyBoard.bind(null, item.walletAdr)}
                      isCopied={item.isCopyied}
                      className="copy-icon-area"
                    />
                  </td>
                  <td>{item.currentBalance} ETH</td>
                  <td>
                    <div className="center">
                      <Button onClick={deposit.bind(null, item.walletId)}>
                        Deposit
                      </Button>
                    </div>
                  </td>
                  <td>
                    <div className="center">
                      <Button onClick={withdraw.bind(null, item.walletId)}>
                        Withdraw
                      </Button>
                    </div>
                  </td>

                  <td>
                    {item.IsStaked ? (
                      <span className="staked-true">YES</span>
                    ) : (
                      <span className="staked-false">NO</span>
                    )}
                  </td>
                  <td>
                    {" "}
                    <div className="center">
                      <Button onClick={stake.bind(null, item.walletId)}>
                        Stake
                      </Button>
                    </div>
                  </td>
                  <td>
                    <CurrentStake walletID={item.walletId} />
                  </td>
                  <td>
                    <Reward walletID={item.walletId} />{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {showDepositModal && (
        <DepositModal
          walletId={currentWallet}
          msg="Deposit"
          onClose={closeModal}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          walletId={currentWallet}
          msg="Withdraw"
          onClose={closeModal}
        />
      )}
      {showStakingModal && (
        <StakeModal
          walletId={currentWallet}
          msg="Withdraw"
          onClose={closeModal}
        />
      )}
    </React.Fragment>
  );
}

export default WalletTable;
