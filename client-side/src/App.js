import React from "react";

import Web3Provider from "./web3/Web3Provider.js";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

import {
  wagmiConfig,
  WagmiWeb3ModalParameters,
} from "./web3/wagmi-parameter.js";

import NavbarScrool from "./Components/Navbar";
import MainArea from "./Components/MainArea.jsx";
import Footer from "./Components/Footer.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

createWeb3Modal(WagmiWeb3ModalParameters);

function App() {
  return (
    <React.Fragment>
      <WagmiConfig config={wagmiConfig}>
        <Web3Provider>
          <NavbarScrool />
          <MainArea />
          <Footer />
        </Web3Provider>
      </WagmiConfig>
    </React.Fragment>
  );
}

export default App;
