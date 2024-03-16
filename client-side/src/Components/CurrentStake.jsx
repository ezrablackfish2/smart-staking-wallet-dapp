import React, { useContext, useState } from "react";
import Web3Context from "../web3/Web3-context.js";
import Button from "../UI/Button.jsx";
import Web3 from "web3";
import Spinning from "../UI/Spinning.jsx";

function CurrentStake({ walletID }) {
  const web3Ctx = useContext(Web3Context);
  const [showSpining, setShowSpining] = useState(false);

  async function unStake() {
    setShowSpining(true);
    web3Ctx.UnstakingEth.write({
      args: [walletID],
      from: web3Ctx.address,
    });

    setTimeout(() => {
      setShowSpining(false);
    }, 500);
  }

  return (
    <React.Fragment>
      <div className="reward-area">
        {web3Ctx.Wallets[walletID].currentStake} ETH
        <Button onClick={unStake}>
          {showSpining ? <Spinning isBtn={true} /> : "Unstake"}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default CurrentStake;
