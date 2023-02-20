let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");
let collection_manager_contract;
let { ApiPromise, WsProvider } = require("@polkadot/api");

module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c)
  collection_manager_contract = c;
}

module.exports.getCollectionCount = async function (caller_account) {
  if (!collection_manager_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(collection_manager_contract.api);
  const azero_value = 0;

  const { result, output } =
    await collection_manager_contract.query.getCollectionCount(address, {
      value: azero_value,
      gasLimit,
    });
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.getContractById = async function (caller_account, collection_id) {
  if (!collection_manager_contract || !caller_account) {

    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(collection_manager_contract.api);
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } =
    await collection_manager_contract.query.getContractById(
      address,
      { value: azero_value, gasLimit },
      collection_id
    );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getCollectionByAddress = async function (caller_account, collection_address) {
  if (
    !collection_manager_contract ||
    !caller_account ||
    !isValidAddressPolkadotAddress(collection_address)
  ) {

    return null;
  }

  const gasLimit = await readOnlyGasLimit(collection_manager_contract.api);
  const azero_value = 0;
  //console.log(collection_manager_contract);

  const { result, output } =
    await collection_manager_contract.query.getCollectionByAddress(
      caller_account,
      { value: azero_value, gasLimit },
      collection_address
    );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}


module.exports.getAttributes = async function (caller_account, nft_contract_address, attributes) {
  if (!collection_manager_contract || !caller_account) {

    return null;
  }
  let attributeVals;
  const gasLimit = await readOnlyGasLimit(collection_manager_contract.api);
  const azero_value = 0;
  const address = caller_account;
  const { result, output } =
    await collection_manager_contract.query.getAttributes(
      address,
      { value: azero_value, gasLimit },
      nft_contract_address,
      attributes
    );
  if (result.isOk) {
    attributeVals = output.toHuman().Ok;
  }
  return attributeVals;
}
