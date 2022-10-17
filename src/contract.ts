import abi from "./BEP20_ABI.json";
import { CONTRACT_ADDRESS, PROVIDER_URL } from "./constants";

const Web3 = require("web3");
const web3 = new Web3(PROVIDER_URL);
const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

export const getTokenBalance = (accountAddress: string) =>
  contract.methods
    .balanceOf(accountAddress)
    .call((err: any, result: any) => result);

export const getTokenSymbol = () =>
  contract.methods.symbol().call((err: any, result: any) => result);

export default contract;
