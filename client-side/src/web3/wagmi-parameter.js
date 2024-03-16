import { defaultWagmiConfig } from "@web3modal/wagmi/react";
import { sepolia } from "wagmi/chains";

const REACT_APP_PROJECT_ID = "3f6664f1f18768e81352302f6051c8ba";

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia];
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId: REACT_APP_PROJECT_ID,
  metadata,
});

export const WagmiWeb3ModalParameters = {
  wagmiConfig,
  projectId: REACT_APP_PROJECT_ID,
  chains,
};
