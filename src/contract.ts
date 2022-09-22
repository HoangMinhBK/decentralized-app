import abi from "./BEP20_ABI.json";

const TOKEN_ADDRESS = "0x4abef176f22b9a71b45ddc6c4a115095d8761b37";

const Web3 = require("web3");
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
const contract = new web3.eth.Contract(abi, TOKEN_ADDRESS);

export const getTokenBalance = (accountAddress: string) =>
  contract.methods
    .balanceOf(accountAddress)
    .call((err: any, result: any) => result);

export const getTokenSymbol = () =>
  contract.methods.symbol().call((err: any, result: any) => result);

export default contract;
