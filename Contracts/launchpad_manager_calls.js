let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");
let launchpad_manager_contract;

module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c)
  launchpad_manager_contract = c;
}

module.exports.getProjectCount = async function (caller_account) {
  if (!launchpad_manager_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(launchpad_manager_contract.api);
  const azero_value = 0;

  const { result, output } =
    await launchpad_manager_contract.query.getProjectCount(address, {
      value: azero_value,
      gasLimit,
    });
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.getProjectById = async function (caller_account, projectId) {
  if (!launchpad_manager_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(launchpad_manager_contract.api);
  const azero_value = 0;

  const { result, output } =
    await launchpad_manager_contract.query.getProjectById(address, {
      value: azero_value,
      gasLimit,
    }, projectId);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getProjectByNftAddress = async function (caller_account, nftContractAddress) {
  if (!launchpad_manager_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(launchpad_manager_contract.api);
  const azero_value = 0;

  const { result, output } =
    await launchpad_manager_contract.query.getProjectByNftAddress(address, {
      value: azero_value,
      gasLimit,
    }, nftContractAddress);
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}
