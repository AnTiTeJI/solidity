import Moralis from "moralis";

export const moralis = Moralis;
const serverUrl = "https://xqk6qbfdyqfc.usemoralis.com:2053/server";
const appId = "uhPe3Dlh6c1t5lnocAGaXwQHxfaREjx74FWdPHVx";

export async function moralisInit() {
    await moralis.start({serverUrl, appId});
    if(moralis.User.current())
        return true;
    return false;
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