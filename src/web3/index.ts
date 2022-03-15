import Web3 from "web3";
import AppleToken from "../contracts/AppleToken.json"
export const web3 = new Web3((window as any).ethereum);

export const AppleContract = new web3.eth.Contract(AppleToken.abi as any, "0x16124D88e7d3F5dbe3Beb61335176afab0963c5b");