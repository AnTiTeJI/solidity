import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import { moralisAuth, moralisInit, moralisLogout } from './web3/moralis';
import "./App.css"
function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => { moralisInit().then(res => setAuth(res)) }, []);
  return (
    <div className="container">
      {    
        !auth
        ? <button
              onClick={() => moralisAuth(setAuth)}
        >Auth</button>
        : <>
            <Home />
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