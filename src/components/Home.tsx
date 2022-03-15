import React, { FC, useEffect, useState } from 'react'
import { web3 } from '../web3';
import {abi} from "../contracts/AppleToken.json"
import { moralis } from '../web3/moralis';

const apple = new web3.eth.Contract(abi as any, "0x3f4c2AFf8003ec599D33bb2d4801b4b90352AB40");

const Home: FC = function () {
    const [user, setUser] = useState<string>("");
    const [sender, setSender] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    const [price, setPrice] = useState<number>(0);
    const [count, setCount] = useState<number>(0);
    const [balance, setBalance] = useState<number>(0);
    const [ethBalance, setEthBalance] = useState<number>(0);
    const [balanceSender, setBalanceSender] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<number>(0);
    
    function reloader() {
        setUser(moralis.User.current()?.get("ethAddress"));
        if(user)
        {
            apple.methods.balanceOf(user).call()
                .then((res: number) => setBalance(res));
            apple?.methods?.getBalance(user).call()
                .then((res: number) => setEthBalance(res));
        }
        apple?.methods?.totalSupply().call()
            .then((res: number) => setTotalSupply(res));
        apple.methods?.getPrice().call()
            .then((res: number) => setPrice(res));
        apple.methods.getSender().call()
            .then((res: string) => 
            {
                setSender(res);
                apple.methods.balanceOf(res).call()
                    .then((res: number) => setBalanceSender(res));
            });
    }
    function buyToken() {
        apple.methods.TransferToken(address, count).send({
            from: user,
            value: count * price
        }).then(() => reloader());
    }
    useEffect(() => console.log(apple), []);
    useEffect(() => reloader(), [user]);
    useEffect(() => {
        const elts = document.getElementsByClassName("link") as HTMLCollectionOf<HTMLLabelElement>;
        
        for(let i in elts) {
            if(elts[i].classList?.contains('link'))
                elts[i].onclick = (e: any) => 
                    { window.navigator.clipboard.writeText(e.currentTarget.textContent)}
        }
    }, [user, sender]);
    return (
        <div>
            <div>
                <div>
                    Your address: <label className='link' children={user}  />
                    <br/>
                    Your ether balance: {ethBalance / Math.pow(10, 18)} ether
                    <br/>
                    Your balance: {balance}
                    <br/>
                    Token price: {ethBalance / balance / Math.pow(10, 18)} ether
                    <hr/>
                    {sender.toLowerCase() !== user.toLowerCase() && 
                        <>
                            Sender: <label className='link' children={sender} />
                            <br/>
                            Balance sender: {balanceSender}
                            <hr/>
                        </>
                    } 
                    Total supply: {totalSupply}
                </div>
                <hr/>
                <div className='transfer'>
                    <input placeholder='adress' onChange={(e) => setAddress(e.target.value)}/>
                    <input placeholder='count' onChange={(e) => setCount(Number(e.target.value))}/>
                    <div className="btn-manage">
                        <button
                            onClick={() => buyToken()}
                        >Buy token</button>
                        <button
                        onClick={() => 
                            user && apple?.methods?.transfer(address, count).send(
                                {
                                    from: user,
                                }
                            ).then(() => reloader())
                        }
                        >Transfer</button>
                        <button
                            onClick={() => 
                                user && apple?.methods?.Mint(address, count).send(
                                    {
                                        from: user,
                                    }
                                ).then(() => reloader())
                            }
                        >Mint</button>
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default Home;