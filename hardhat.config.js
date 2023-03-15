
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = 'e0adfcd5d9c09523479a64d571c06924e4e7401538e65ccf8af5259b577f7280';
const API_KEY = 'qqMocWf5NWfyaCHU97Al_bwUihjFUvdU';

module.exports = {
  solidity: "0.8.18",
  networks : {
    mumbai:{
      url : 'https://polygon-mumbai.g.alchemy.com/v2/qqMocWf5NWfyaCHU97Al_bwUihjFUvdU',
      accounts: [PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: '8AQHHS6SS6UHVZJ6U55VXDPMSRNX1G339K'
  }
};
