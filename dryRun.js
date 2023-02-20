let { BN, bnToBn } = require("@polkadot/util");
let { convertWeight } = require("@polkadot/api-contract/base/util");

const toContractAbiMessage = (
  contractPromise,
  message
) => {
  const value = contractPromise.abi.messages.find((m) => m.method === message);

  if (!value) {
    const messages = contractPromise?.abi.messages.map((m) => m.method).join(', ');

    const error = `"${message}" not found in metadata.spec.messages: [${messages}]`;
    console.error(error);

    return { ok: false, error };
  }

  return { ok: true, value };
};

module.exports.getGasLimit = async function (
  api,
  userAddress,
  message,
  contract,
  options = {},
  args = []
  // temporarily type is Weight instead of WeightV2 until polkadot-js type `ContractExecResult` will be changed to WeightV2
) {
  const abiMessage = toContractAbiMessage(contract, message);
  if (!abiMessage.ok) return abiMessage;

  const { value, gasLimit, storageDepositLimit } = options;
  
  const result = await api.call.contractsApi.call(
    userAddress,
    contract.address,
    value ?? new BN(0),
    gasLimit ?? null,
    storageDepositLimit ?? null,
    abiMessage.value.toU8a(args)
  );

  const {v2Weight} = convertWeight(result.gasRequired);
  const gasRequired = api.registry.createType("WeightV2", {
    refTime: v2Weight.refTime.add(new BN(25_000_000_000)),
    proofSize: v2Weight.proofSize,
  });

  return { ok: true, value: gasRequired };
};