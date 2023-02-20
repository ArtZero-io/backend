let BN = require("bn.js");
let  { isValidAddressPolkadotAddress, readOnlyGasLimit } = require("../utils.js");
let {getGasLimit} = require("../dryRun.js");
let { Keyring } = require("@polkadot/keyring");

let staking_contract;
module.exports.setContract = function (c) {
  // console.log(`Setting contract in blockchain module`, c);
  staking_contract = c;
}

module.exports.getTotalStaked = async function (caller_account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.getTotalStaked(address, {
    value: azero_value,
    gasLimit,
  });
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.isClaimed = async function (caller_account,account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.isClaimed(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    account
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getIsLocked = async function (caller_account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.getIsLocked(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getRewardStarted = async function (caller_account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.getRewardStarted(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.getTotalCountOfStakeholders = async function (caller_account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.getStakedAccountsLastIndex(
    address,
    {
      value: azero_value,
      gasLimit,
    }
  );
  if (result.isOk) {
    return new BN(output.toHuman().Ok, 10, "le").toNumber();
  }
  return null;
}

module.exports.getStakedAccountsAccountByIndex = async function (caller_account,index) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query.getStakedAccountsAccountByIndex(
    address,
    {
      value: azero_value,
      gasLimit,
    },
    index
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return null;
}

module.exports.setClaimedStatus = async function (keypair, caller, account){

  const gasLimitResult = await getGasLimit(
    staking_contract.api,
    caller,
    "setClaimedStatus",
    staking_contract,
    {},
    [account]
  );

  if (!gasLimitResult.ok) {
    console.log('gasLimitResult.error', gasLimitResult.error);
    return;
  }

  const { value: gasLimit } = gasLimitResult;
  const value = 0;

  await staking_contract.tx
      .setClaimedStatus({ gasLimit, value },account)
      .signAndSend(keypair, result => {
        if (result.status.isInBlock) {
          console.log('in a block');
        } else if (result.status.isFinalized) {
          console.log('finalized');
        }
      })
      .catch((e) => console.log("e", e));

}

module.exports.isAdmin = async function (caller_account, account) {
  if (!staking_contract || !caller_account) {
    console.log("invalid inputs");
    return null;
  }
  const address = caller_account?.address;
  const gasLimit = await readOnlyGasLimit(staking_contract.api);
  const azero_value = 0;

  const { result, output } = await staking_contract.query["accessControl::hasRole"](
    address,
    {
      value: azero_value,
      gasLimit,
    },
    '3739740293',
    account
  );
  if (result.isOk) {
    return output.toHuman().Ok;
  }
  return false;
}

