let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");

module.exports.getProjectInfo = async function (launchpad_psp34_standard_contract,caller_account) {
  if (!launchpad_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(launchpad_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await launchpad_psp34_standard_contract.query.getProjectInfo(address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getOwner = async function (launchpad_psp34_standard_contract,caller_account) {
  if (!launchpad_psp34_standard_contract || !caller_account) {
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(launchpad_psp34_standard_contract.api);
  const azero_value = 0;

  const { result, output } = await launchpad_psp34_standard_contract.query['ownable::owner'](address, { value: azero_value, gasLimit });
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}
