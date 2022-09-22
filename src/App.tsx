import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  connectWallet,
  disconnectWallet,
  getTokenSymbolAndBalance,
} from "./redux/walletSlice";
import "./App.css";
import { CONNECTION_STATUS } from "./constants";
import { getTokenBalance, getTokenSymbol } from "./contract";
import BigNumber from "bignumber.js";

function App() {
  const dispatch = useDispatch();
  const address = useSelector((state: any) => state.wallet.address);
  const tokenSymbol = useSelector((state: any) => state.wallet.symbol);
  const tokenBalance = useSelector((state: any) => state.wallet.balance);
  const connectionStatus = useSelector(
    (state: any) => state.wallet.connectionStatus
  );

  const handleConnectWallet = async () => {
    try {
      const res = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      dispatch(connectWallet(res));
    } catch (error) {
      console.error("Some errors occurred!");
    }
  };

  const handleGetTokenBalanceAndSymbol = async (address: string) => {
    try {
      const symbol = await getTokenSymbol();
      const balance = await getTokenBalance(address);
      const formattedBalance = new BigNumber(balance).div(10 ** 18).toNumber();
      dispatch(
        getTokenSymbolAndBalance({
          symbol: symbol,
          balance: formattedBalance,
        })
      );
    } catch (err) {
      console.error("Failed to get token symbol and balance");
    }
  };
  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const handleAccountsList = async (addressList: Array<string>) => {
    console.log("checkConnectionHandler is called");
    if (addressList.length === 0) {
      handleDisconnectWallet();
    } else handleConnectWallet();
  };

  useEffect(() => {
    (window as any).ethereum.on("accountsChanged", handleAccountsList);
  }, []);

  useEffect(() => {
    if (address !== undefined) handleGetTokenBalanceAndSymbol(address);
  }, [address]);

  return (
    <div
      className="App"
      style={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <h1>Connect To Metamask Wallet</h1>
      {address && <h2 style={{ fontWeight: "normal" }}>Address: {address}</h2>}
      {tokenBalance && (
        <h2>
          Balance: {tokenBalance} {tokenSymbol}
        </h2>
      )}
      <div
        style={{
          borderRadius: "50px",
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "10px",
          paddingRight: "10px",
          fontWeight: "bold",
          border:
            connectionStatus === CONNECTION_STATUS.connected
              ? "1px #27EB23 solid"
              : "1px red solid",
          color:
            connectionStatus === CONNECTION_STATUS.connected
              ? "#27EB23"
              : "red",
        }}
      >
        Status: {connectionStatus}
      </div>
      <button
        style={{ width: "200px", height: "50px", fontSize: "20px" }}
        onClick={() => {
          if (connectionStatus === CONNECTION_STATUS.disconnected)
            handleConnectWallet();
          else handleDisconnectWallet();
        }}
      >
        {connectionStatus === CONNECTION_STATUS.disconnected
          ? "Connect Wallet"
          : "Disconnect Wallet"}
      </button>
      <div style={{ position: "fixed", bottom: 30 }}>
        <h5 style={{ fontWeight: "normal" }}>
          Demo Front-End Decentralized Application
        </h5>
        <a href="https://techfi.tech/author/nguyen-luu-hoang-minh/">
          By Nguyen Luu Hoang Minh - TechFi
        </a>
      </div>
    </div>
  );
}

export default App;
