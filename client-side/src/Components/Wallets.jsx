import React, { useContext } from "react";
import Web3Context from "../web3/Web3-context";
import WalletTable from "./WalletTable";
import Button from "../UI/Button";
import Spinning from "../UI/Spinning";

function Wallets() {
  const web3Ctx = useContext(Web3Context);

  async function createWallet() {
    await web3Ctx.createWallet.write({ from: web3Ctx.address });
  }

  function createWalletHandle() {
    createWallet();
  }

  return (
    <React.Fragment>
      <h1 className="wallet-title" style={{ padding: "5px" }}>
        My Wallets
      </h1>
      <div className="wallet-table-area">
        <WalletTable />
      </div>
      <div className="create-wallet-btn-area">
        <Button className="create-wallet-btn" onClick={createWalletHandle}>
          {web3Ctx.createWallet.isLoading ? (
            <Spinning isBtn={true} />
          ) : (
            "Create Wallet"
          )}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Wallets;
