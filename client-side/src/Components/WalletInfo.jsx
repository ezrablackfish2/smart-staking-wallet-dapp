import React, { useState, useContext } from "react";
import Web3Context from "../web3/Web3-context.js";
import Table from "react-bootstrap/Table";
import { ContractInfo } from "../contract/ContractInfo";
import CopyIcon from "../UI/CopyIcon";

function WalletInfo() {
  const [isCopied, setIsCopied] = useState(false);
  const web3Ctx = useContext(Web3Context);

  const clickCopyBoard = () => {
    navigator.clipboard.writeText(ContractInfo.ADDRESS);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <React.Fragment>
      <div className="wallet-title" style={{ marginTop: "1rem" }}>
        <h1>Wallet Info</h1>
      </div>
      <div className="wallet-info-content">
        <Table bordered hover bsPrefix="my-table">
          <tbody>
            <tr>
              <td className="bold">Staking Pool Address :</td>
              <td>
                {ContractInfo.ADDRESS}{" "}
                <CopyIcon
                  onClick={clickCopyBoard}
                  isCopied={isCopied}
                  className="copy-icon-area"
                />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="bold">Total Address Staked :</td>
              <td>{web3Ctx.totalStakedAdr}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="bold">Total Staked :</td>
              <td>{web3Ctx.totalStakedValue}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="bold">Your AET Balance :</td>
              <td>{web3Ctx.AETBalance} AET</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default WalletInfo;
