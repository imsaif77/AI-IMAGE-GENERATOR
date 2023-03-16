import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Card } from 'antd';

import { JsonRpcProvider } from 'ethers/providers';

import MARKET_ABI from '../Marketplace.json'
import { mapAvailableMarketItems } from '../utils/nft';

const contractAddress = '0xE8Fa609f348AB1F567850c09b166a7C489bD156c';
const provider = new JsonRpcProvider('https://matic-mumbai.chainstacklabs.com');
// provider = new ethers.providers.PolygonProvider('mumbai');


 var signer = new ethers.Wallet('e0adfcd5d9c09523479a64d571c06924e4e7401538e65ccf8af5259b577f7280', provider);

//  var signer = provider.getSigner();
var marketplaceContract = new ethers.Contract(contractAddress, MARKET_ABI, signer);



const Dashboard = ({nftContract}) => {

    const [nfts,setNfts] = useState([])
    
  useEffect(() => {
    loadNFTs()
  }, [])


    async function loadNFTs () {
        const data = await marketplaceContract.fetchAvailableMarketItems()
        const items = await Promise.all(data.map(mapAvailableMarketItems(nftContract)))
        setNfts(items)
        // setIsLoading(false)
      }
    

      const nftlist = (nfts) => {
        return nfts.map(nft => <>
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={nft.image} />}
        >
            <p>Creator : {nft.creator}</p>
        </Card>
        </>)
      }


console.log(nfts)

    return(
        <>
        
        {nftlist(nfts)}
        
        </>
    )

}

export default Dashboard