let profile_contract;
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");

module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c);
  profile_contract = c;
}

module.exports.getAttributes = async function (caller_account, accountAddress, attributes) {
  if (!profile_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(profile_contract.api);
  const azero_value = 0;
  let attributeVals;
  const { result, output } = await profile_contract.query.getAttributes(address, {
    value: azero_value,
    gasLimit,
  }, accountAddress, attributes);
  if (result.isOk) {
    attributeVals = output.toHuman().Ok;
  }
  return attributeVals;
}