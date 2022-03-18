import Web3 from "web3";
import Moralis from "moralis";
import AppleToken from "../contracts/AppleToken.json"
import PerlToken from "../contracts/PerlToken.json"

export const web3 = new Web3((window as any).ethereum);
export const moralis = Moralis;

const serverUrl = "https://xqk6qbfdyqfc.usemoralis.com:2053/server";
const appId = "uhPe3Dlh6c1t5lnocAGaXwQHxfaREjx74FWdPHVx";

export const AppleContract = new web3.eth.Contract(AppleToken.abi as any, "0x16124D88e7d3F5dbe3Beb61335176afab0963c5b");
export const PerlContract = new web3.eth.Contract(PerlToken.abi as any, "0x8fce1e0c7d7964bc4055614b2Bf8e6D889B6BD0a");


export async function moralisInit() {
    await moralis.start({serverUrl, appId});
    const moralisUser = moralis.User?.current()?.get("ethAddress");
    const currentUser = (web3.eth.accounts?.currentProvider as any).selectedAddress;
    if(moralisUser?.toLowerCase() !== currentUser?.toLowerCase())
        return false;
    return true;
}

export async function  moralisAuth(setter: (value: boolean) => void) {
    await moralis.authenticate();
    if(moralis.User.current())
        setter(true);
}

export async function  moralisLogout(setter: (value: boolean) => void) {
    await moralis.User.logOut();
    if(!moralis.User.current())
        setter(false);
}
