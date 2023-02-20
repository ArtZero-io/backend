let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit, convertNumberWithoutCommas } = require("../utils.js");


module.exports.getTotalSupply = async function (nft721_psp34_standard_contract,caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34::totalSupply"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(convertNumberWithoutCommas(output.toHuman().Ok), 10, "le").toNumber();
  }
  return null;
}

module.exports.isLockedNft = async function (nft721_psp34_standard_contract,caller_account, tokenId) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query["psp34Traits::isLockedNft"](address, { value: azero_value, gasLimit }, tokenId);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getAttributeName = async function (nft721_psp34_standard_contract,caller_account, attributeIndex) {
  if (!nft721_psp34_standard_contract || !caller_account) {

    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributeName"
  ](address, { value: azero_value, gasLimit }, attributeIndex);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getAttributeCount = async function (nft721_psp34_standard_contract,caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributeCount"
  ](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.getAttribute = async function (nft721_psp34_standard_contract,caller_account, tokenId, attribute) {
  if (!nft721_psp34_standard_contract || !caller_account) {

    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  //console.log('getAttribute:getAttribute caller_account', caller_account);
  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Metadata::getAttribute"
  ](address, { value: azero_value, gasLimit }, tokenId, attribute);
  //console.log('getAttribute:getAttribute result', result);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getAttributes = async function (nft721_psp34_standard_contract,caller_account, tokenId, attributes) {
  if (!nft721_psp34_standard_contract || !caller_account) {

    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await nft721_psp34_standard_contract.query[
    "psp34Traits::getAttributes"
  ](address, { value: azero_value, gasLimit }, tokenId, attributes);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.ownerOf = async function (nft721_psp34_standard_contract,caller_account, tokenId) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;
  //console.log(artzero_contract);

  const { result, output } = await nft721_psp34_standard_contract.query["psp34::ownerOf"](
    address,
    { value: azero_value, gasLimit },
    tokenId
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}


module.exports.getLastTokenId = async function (nft721_psp34_standard_contract,caller_account) {
  if (!nft721_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(nft721_psp34_standard_contract.api);
  const azero_value = 0;
  //console.log(artzero_contract);

  const { result, output } = await nft721_psp34_standard_contract.query["psp34Traits::getLastTokenId"](
    address,
    { value: azero_value, gasLimit }
  );
  console.log('getLastTokenId output',output.toHuman().Ok);
  if (result.isOk) {
    console.log('getLastTokenId output lastTokenId',convertNumberWithoutCommas(output.toHuman().Ok));
    console.log('getLastTokenId output lastTokenId',new BN(convertNumberWithoutCommas(output.toHuman().Ok), 10, "le").toNumber());
    return new BN(convertNumberWithoutCommas(output.toHuman().Ok), 10, "le").toNumber();
  }
  return null;
}
