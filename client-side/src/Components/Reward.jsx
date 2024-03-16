import React, { useContext, useState, useEffect } from "react";
import Web3Context from "../web3/Web3-context.js";
import Button from "../UI/Button.jsx";
import Web3 from "web3";
import Spinning from "../UI/Spinning.jsx";

function Reward({ walletID }) {
  const web3Ctx = useContext(Web3Context);
  const [showSpining, setShowSpining] = useState(false);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    setReward(web3Ctx.Wallets[walletID].rewards);
  }, []);

  async function getReward() {
    setShowSpining(true);
    const web3 = new Web3(window.ethereum);
    const currentReward = await web3Ctx.getCurrentRewards(walletID);
    const currentRewardEth = await web3.utils.fromWei(currentReward, "ether");
    setReward(currentRewardEth);
    setTimeout(() => {
      setShowSpining(false);
    }, 500);
  }

  return (
    <React.Fragment>
      <div className="reward-area">
        {reward} AET
        <Button onClick={getReward}>
          {showSpining ? <Spinning isBtn={true} /> : "Refresh"}
        </Button>
      </div>
    </React.Fragment>
  );
}

export default Reward;
