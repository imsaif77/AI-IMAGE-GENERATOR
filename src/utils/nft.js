import axios from 'axios'

export async function getTokenMetadataByTokenId (nftContract, tokenId) {
  try {
    const tokenUri = await nftContract.tokenURI(tokenId)
    const  metadata = await axios.get(tokenUri)

    return tokenUri
  } catch (error) {
    console.log(error)
  }
}



export function mapAvailableMarketItems (nftContract) {
  return async (marketItem) => {
    try {
      const metadata = await getTokenMetadataByTokenId(nftContract, marketItem.tokenId)
      return mapMarketItem(marketItem, metadata)
    } catch (error) {
      console.log(`Error retrieving metadata for token ${marketItem.tokenId}: ${error}`)
      // You could return a default market item object or null here, depending on your use case
      return null
    }
  }
}


export function mapCreatedAndOwnedTokenIdsAsMarketItems (marketplaceContract, nftContract, account) {
  return async (tokenId) => {
    const metadata = await getTokenMetadataByTokenId(nftContract, tokenId)
    const approveAddress = await nftContract.getApproved(tokenId)
    const hasMarketApproval = approveAddress === marketplaceContract.address
    const [foundMarketItem, hasFound] = await marketplaceContract.getLatestMarketItemByTokenId(tokenId)
    const marketItem = hasFound ? foundMarketItem : {}
    return mapMarketItem(marketItem, metadata, tokenId, account, hasMarketApproval)
  }
}

export function mapMarketItem (marketItem, metadata, tokenId, account, hasMarketApproval) {
  return {
    price: marketItem.price,
    tokenId: marketItem.tokenId || tokenId,
    marketItemId: marketItem.marketItemId || undefined,
    creator: marketItem.creator || account,
    seller: marketItem.seller || undefined,
    owner: marketItem.owner || account,
    sold: marketItem.sold || false,
    canceled: marketItem.canceled || false,
    image: metadata,
    name: metadata.name,
    description: metadata.description,
    hasMarketApproval: hasMarketApproval || false
  }
}

export async function getUniqueOwnedAndCreatedTokenIds (nftContract) {
  const nftIdsCreatedByMe = await nftContract.getTokensCreatedByMe()
  const nftIdsOwnedByMe = await nftContract.getTokensOwnedByMe()
  const myNftIds = [...nftIdsCreatedByMe, ...nftIdsOwnedByMe]
  return [...new Map(myNftIds.map((item) => [item._hex, item])).values()]
}