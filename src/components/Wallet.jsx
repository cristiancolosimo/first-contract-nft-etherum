import { ethers} from 'ethers';
import {useState} from 'react';

import MyGeass from '../artifacts/contracts/MyNFT.sol/MyGeass.json'

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'
const provider = new ethers.providers.Web3Provider(window.ethereum);


const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, MyGeass.abi, signer);


function WalletBalance(){
    const [balance,setBalance] = useState();

    const getBalance = async ()=>{
        const [account] = await window.ethereum.request({method:"eth_requestAccounts"});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);
        console.log({balance,provider});
        setBalance(ethers.utils.formatEther(balance));

    }
    const mint = async ()=>{
        
    }
    return (
        <>
        <div className="card">
            <div>
            <h5>Hai {balance} eth</h5>
            <button onClick={()=>getBalance()}>Ottieni bilancio</button>
            <button onClick={()=>MintToken()}> Minta</button>
            </div>
        </div>

        </>
    )
}

const MintToken = async ()=>{
    let metadataURI = Math.random()*10000;
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.toPayToMint(addr,metadataURI+"", {
        value: ethers.utils.parseEther("0.5"),
    })
    await result.wait();

}
export default WalletBalance;