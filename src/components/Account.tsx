import React, { FC, useEffect, useState } from 'react'
import { PerlContract } from '../web3';

interface AccountProps {
    tokens: any[],
    ethAddress: string
}

const Account: FC<AccountProps> = function ({ tokens, ethAddress }) {
        const [balance, setBalance] = useState<number>(0);
    useEffect(() => {
        if(ethAddress) {
            PerlContract.methods.balanceOf(ethAddress).call()
                .then((balance: number) => setBalance(balance))
        }
    },[ethAddress]);
    return (
        <div className='account-wrapper'>
            Your address: {ethAddress}
            <br/>
            Your balance: {balance}
        </div>
    )
}

export default Account;