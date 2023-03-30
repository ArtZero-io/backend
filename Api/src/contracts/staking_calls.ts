import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {getGasLimit, readOnlyGasLimit} from "../utils/utils";
import {KeyringPair} from "@polkadot/keyring/types";

let staking_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    staking_contract = c;
}

export async function getTotalStaked(caller_account: string) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::getTotalStaked"](
        address,
        {
            value: azero_value,
            gasLimit
        }
    );
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
    }
    return null;
}

export async function isClaimed(caller_account: any, account: string) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    // @ts-ignore
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::isClaimed"](
        address,
        {
            value: azero_value,
            gasLimit,
        },
        account
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getIsLocked(caller_account: any) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::getIsLocked"](
        address,
        {
            value: azero_value,
            gasLimit,
        }
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getRewardStarted(caller_account: any) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::getRewardStarted"](
        address,
        {
            value: azero_value,
            gasLimit,
        }
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getTotalCountOfStakeholders(caller_account: any): Promise<number> {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return 0;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::getStakedAccountsLastIndex"](
        address,
        {
            value: azero_value,
            gasLimit,
        }
    );
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
        // return new BN(output, 10, "le").toNumber();
    }
    return 0;
}

export async function getStakedAccountsAccountByIndex(caller_account: any, index: number) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
    const azero_value = 0;
    const {result, output} = await staking_contract.query["artZeroStakingTrait::getStakedAccountsAccountByIndex"](
        address,
        {
            value: azero_value,
            gasLimit,
        },
        index
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function setClaimedStatus(keypair: KeyringPair, caller:string, account: string) {
    const gasLimitResult = await getGasLimit(
        staking_contract.api,
        caller,
        "setClaimedStatus",
        staking_contract,
        {},
        [account]
    );
    if (!gasLimitResult.ok) {
        // @ts-ignore
        console.log('gasLimitResult.error', gasLimitResult?.error);
        return;
    }
    const { value: gasLimit } = gasLimitResult;
    const value = 0;
    // @ts-ignore
    await staking_contract.tx.setClaimedStatus({ gasLimit, value },account)
        .signAndSend(keypair, result => {
            if (result.status.isInBlock) {
                console.log('in a block');
            } else if (result.status.isFinalized) {
                console.log('finalized');
            }
        })
        .catch((e) => console.log("e", e));
}

export async function isAdmin(caller_account: any, account: string) {
    if (!staking_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(staking_contract.api);
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
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return false;
}