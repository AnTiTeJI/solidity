import React, { useEffect, useState } from 'react';
import { moralis, moralisAuth, moralisInit, moralisLogout, PerlContract } from './web3';
import "./App.css"
import Account from './components/Account';
import PerlToken from './components/PerlToken';
function App() {
  const [auth, setAuth] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState<string>("");
  const [tokens, setTokens] = useState<string[]>([]);
  useEffect(() => {
    moralisInit()
      .then(auth => setAuth(auth));
    setEthAddress(moralis.User.current()?.get("ethAddress"));
    if(ethAddress) {
    console.log(PerlContract);
      PerlContract.methods.tokens().call()
        .then((tokens: string[]) => setTokens(tokens));
    }
  } , [auth, ethAddress]);
  
  return (
    <div className="container">
      {    
        !auth
        ? <button
              onClick={() => moralisAuth(setAuth)}
        >Auth</button>
        : <>
            <Account
              tokens={tokens}
              ethAddress={ethAddress}
            />
            <PerlToken
              ethAddress={ethAddress}
            />
            <button
              onClick={() => moralisLogout(setAuth)}
            >Logout
            </button>
          </>
      }
   </div>
  );
}

export default App;