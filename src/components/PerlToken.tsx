import React, { FC, useEffect, useState } from 'react'
import { PerlContract } from '../web3';
import { Gateway, uploadImage } from '../web3/pinata';
import { v4 } from "uuid"
interface PerlTokenProps {
    ethAddress: string,
}

interface Token {
    url: string;
    owner: string;
}

interface Offer {
    sender: string;
    id: number;
    price: number;
    tokenId: number;
    is_sold: boolean;
}
const PerlToken: FC<PerlTokenProps> = function ({ethAddress}) {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [image, setImage] = useState<any>();
    const [imageLoading, setImageLoading] = useState(false);
    const [price, setPrice] = useState<number>(0);
    const [tokenId, setTokenId] = useState<number>(0);
    async function mintContract() {
        if(image) {
            setImageLoading(true);
            const name = `${v4()}`;
            let hash: string;
            try {
                hash = await uploadImage(image, name);
            } finally {
                setImageLoading(false);
            }
            if(!hash)
                return;
            PerlContract.methods.mint(hash).send({
                from: ethAddress.toString()
            }).then(() => reloader());
            
        }
    }
    function reloader() {
        if(ethAddress) {
            PerlContract.methods.tokens().call()
                .then((tokens: Token[]) => setTokens(tokens));
            PerlContract.methods.offers().call()
            .then((offers: Offer[]) => setOffers(offers))
        }
    }
    
    useEffect(() => console.log(offers), [offers]);
    useEffect(() => reloader(), [ethAddress]);
    return (
        <div className='perl-wrapper'>
            <div className='perl-manage'>
                <div className='perl-mint'>
                    <input type='file' className='perl-file' 
                        onChange={(e: any) => setImage(e.target.files[0])}
                    />
                    <button disabled={imageLoading}
                        onClick={() => mintContract()}
                    >
                     {imageLoading ? "Loading..." : "Mint"}
                    </button>
                </div>
                <div className='perl-sell'>
                        <input placeholder='token id'
                            className='price'
                            onChange={(e) => setTokenId(Number(e.target.value))}
                            />
                        <input placeholder='price'
                            className='price'
                            onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        <button
                        onClick={() => 
                            PerlContract.methods.offer(tokenId, price).send({
                                from: ethAddress
                            }).then(() => reloader())
                        }>Offer</button>
                </div>
            </div>
            <div className='title'>Tokens</div>
            <div className='perl-table'>
                {tokens && tokens
                .map((token, i) =>
                token.owner.toLowerCase() === ethAddress.toLowerCase() &&
                <div className='token-item' key={token.url}>
                    <img src={Gateway(token.url)}/>
                    <div>  ID: {i}</div>
                </div>)
                }
            </div>
            <div className='title'>Offers</div>
            <div className='perl-table'>
            {offers && offers.map((offer, i) => 
                !offer.is_sold &&
                <div 
                    key={i}
                    className='token-item offer-item'
                    onClick={() => 
                        PerlContract.methods.buy(i).send({
                            from: ethAddress,
                            value: offer.price
                        }).then(() => reloader())}
               >
                    <img src={Gateway(tokens[offer.tokenId].url)}/>
                    <div>
                        ID: {offer.tokenId}
                        <br/>
                        Price: {offer.price / Math.pow(10, 18)} eth
                    </div>
                </div>)
                }
            </div>        
        </div>
    )
}

export default PerlToken;