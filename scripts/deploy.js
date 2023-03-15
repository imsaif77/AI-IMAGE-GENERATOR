const { ethers } = require('hardhat');

async function main() {
  // const Marketplace = await ethers.getContractFactory('Marketplace');
  // const marketplace = await Marketplace.deploy(10); // pass in the fee percent


  const Nft = await ethers.getContractFactory('NFT');
  const ConNft = await Nft.deploy(); // pass in the fee percent


  

  // console.log('Marketplace contract deployed to:', marketplace.address);
  console.log('Nft contract deployed to:', ConNft.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });