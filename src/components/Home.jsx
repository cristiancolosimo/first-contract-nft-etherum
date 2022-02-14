import WalletBalance from "./Wallet";
import { ethers } from 'ethers';

import { useState, useEffect } from 'react';

import MyGeass from '../artifacts/contracts/MyNFT.sol/MyGeass.json'


const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const provider = new ethers.providers.Web3Provider(window.ethereum);


const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, MyGeass.abi, signer);


function Home() {
    const [totalMinted, setTotalMinted] = useState(0);

    useEffect(() => {
        getCount();

    }, []);
    const getCount = async () => {
        const count = await contract.couter();
        setTotalMinted(parseInt(count));
    }
    return (
        <div>
            <WalletBalance />

            <h1>Fired nft collection</h1>
            {Array(totalMinted+1).fill(0).map((_,i)=>{
                <div key={i}>
                    <NFTImage tokenId={i}/>
                </div>
            })}
        </div>
    )
}
export default Home;


function NFTImage({tokenId, getCount}){
    const contentID = ""
    return <></>;
}

function Mint({}){

}

