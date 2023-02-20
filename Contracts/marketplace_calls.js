let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");


let marketplace_contract

function isLoaded() {
  if (marketplace_contract) return true; else return false;
}

module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c);
  marketplace_contract = c;
}

module.exports.getVolumeByCollection = async function (caller_account,nft_contract_address) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(marketplace_contract.api);
  const azero_value = 0
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getVolumeByCollection(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address
  )
  if (result.isOk) {
    try {
        return output.toHuman().Ok.replace(/\,/g, "") / 10 ** 12;
    }
    catch (e){
      send_telegram_message('getVolumeByCollection - ' + e.message);
      return 0;
    }
  }
  return null;
}

module.exports.getNftSaleInfo = async function (caller_account,nft_contract_address,token_id) {
  if (!marketplace_contract || !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address)
    ){
    console.log('invalid inputs');
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(marketplace_contract.api);
  const azero_value = 0;
  //console.log(marketplace_contract);

  const { result, output } = await marketplace_contract.query.getNftSaleInfo(
    address,
    { value:azero_value, gasLimit },
    nft_contract_address,token_id
  )
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getAllBids = async function (caller_account, nft_contract_address, seller, token_id) {
  if (
    !marketplace_contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(nft_contract_address) ||
    !isValidAddressPolkadotAddress(seller)
  ) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(marketplace_contract.api);
  const azero_value = 0;
  //console.log(contract);

  const { result, output } = await marketplace_contract.query.getAllBids(
    address,
    { value: azero_value, gasLimit },
    nft_contract_address,
    seller,
    token_id
  );
  console.log(output.toHuman().Ok);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}
