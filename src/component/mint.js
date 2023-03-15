import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

import NFT_ABI from '../ABI.json'


const provider = new JsonRpcProvider('https://matic-mumbai.chainstacklabs.com');
// provider = new ethers.providers.PolygonProvider('mumbai');

const contractAddress = '0x7dd694b06b69fcb871e3419d84d9a7f6417214c7';

 var signer = new ethers.Wallet('e0adfcd5d9c09523479a64d571c06924e4e7401538e65ccf8af5259b577f7280', provider);

//  var signer = provider.getSigner();
var nftContract = new ethers.Contract(contractAddress, NFT_ABI, signer);



const PinataUpload = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [image, setImage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  async function safeMint(uri) {
    // Call the safeMint function on your contract

    const tx = await nftContract.safeMint(uri);
    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction receipt:", receipt);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('pinataMetadata', JSON.stringify({
      name,
      keyvalues: {
        description,
      },
    }));

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          pinata_api_key: 'ac1ff34d8f097a103ef3',
          pinata_secret_api_key: '006e780246c2729d5ce0f2488448290dec76fb811efe5c4346993f8179da1ba7',
        },
      });
      setUploadStatus(`Success! IPFS hash: ${response.data.IpfsHash}`);

      

       await safeMint(response.data.IpfsHash)


    } catch (error) {
      console.error(error);
      setUploadStatus('Error uploading file to Pinata');
    }
  };

  async function getnfttoken(){

    const tx = await nftContract.tokenURI(1);
    const img = `https://gateway.pinata.cloud/ipfs/${tx}`
    setImage(img)


  }

  useEffect(()=>{
    getnfttoken()
  },[])


  return (


    <div>

<img src={image}  />

      <h2>Upload an image to Pinata</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Choose a file:</label>
          <input type="file" id="fileInput" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="nameInput">Name:</label>
          <input type="text" id="nameInput" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="descriptionInput">Description:</label>
          <textarea id="descriptionInput" value={description} onChange={handleDescriptionChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default PinataUpload;
