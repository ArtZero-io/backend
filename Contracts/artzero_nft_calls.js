let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit, convertNumberWithoutCommas } = require("../utils.js");
let az_nft_contract;

module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c)
  az_nft_contract = c;
}

module.exports.totalSupply = async function (caller_account) {
  if (!az_nft_contract || !caller_account) {

    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(az_nft_contract.api);
  const azero_value = 0;
  //console.log(artzero_contract);

  const { result, output } = await az_nft_contract.query["psp34::totalSupply"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.getLastTokenId = async function (caller_account) {
  if (!az_nft_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(az_nft_contract.api);
  const azero_value = 0;
  //console.log(artzero_contract);

  const { result, output } = await az_nft_contract.query["psp34Traits::getLastTokenId"](
    address,
    { value: azero_value, gasLimit }
  );
  if (result.isOk) {
    return convertNumberWithoutCommas(output.toHuman().Ok);
  }
  return null;
}

module.exports.ownerOf = async function (caller_account, tokenId) {
  if (!az_nft_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(az_nft_contract.api);
  const azero_value = 0;
  //console.log(artzero_contract);

  const { result, output } = await az_nft_contract.query["psp34::ownerOf"](
    address,
    { value: azero_value, gasLimit },
    tokenId
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}
