import { useState, useEffect } from "react";
import { PROVIDER_URL } from "./constants";
import abi from "./BEP20_ABI.json";
import BigNumber from "bignumber.js";

const Web3 = require("web3");
const web3 = new Web3(PROVIDER_URL);

function Explorer() {
  const [address, setAddress] = useState("");
  const [err, setErr] = useState(false);
  const [totalSupply, setTotalSupply] = useState(undefined);
  const [symbol, setSymbol] = useState(undefined);
  const [decimals, setDecimals] = useState<undefined | number>(undefined);
  const [show, setShow] = useState(false);
  const handleAddress = async () => {
    setShow(false);
    setErr(!web3.utils.isAddress(address));
    if (!web3.utils.isAddress(address)) setShow(false);
    if (err === false) {
      const contract = new web3.eth.Contract(abi, address);
      const _symbol = await contract.methods
        .symbol()
        .call((err: any, result: any) => result);
      setSymbol(_symbol);

      const _decimal = await contract.methods
        .decimals()
        .call((err: any, result: any) => result);

      setDecimals(_decimal);

      const _totalSupply = await contract.methods
        .totalSupply()
        .call((err: any, result: any) => result);

      if (decimals !== undefined) {
        const formattedTotalSupply = new BigNumber(_totalSupply)
          .div(10 ** (decimals as number))
          .toNumber();
        setTotalSupply(formattedTotalSupply as any);
      }
    }
  };
  useEffect(() => {
    if (web3.utils.isAddress(address)) handleAddress();
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
        minWidth: "300px",
      }}
    >
      <h1>BEP20 Smart Contract Explorer</h1>
      <div style={{ width: "100%" }}>
        <label>BEP 20 Contract address:</label>
        <input
          type="text"
          style={{ width: "100%", height: "3vh" }}
          onChange={(e) => {
            setAddress(e.target.value);
            setShow(false);
          }}
        />
        {err === true && (
          <div style={{ color: "red" }}>Invalid contract address!</div>
        )}
        <button
          onClick={() => {
            handleAddress();
            if (err === false) setShow(true);
          }}
          style={{ marginTop: "1rem" }}
        >
          Submit
        </button>
      </div>
      {show === true && (
        <div>
          <h3>Contract information:</h3>
          <ul>
            <li>Address: {web3.utils.isAddress(address) && address}</li>
            <li>Symbol: {symbol}</li>
            <li>Total Supply: {totalSupply} </li>
            <li>Decimals: {decimals}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Explorer;
