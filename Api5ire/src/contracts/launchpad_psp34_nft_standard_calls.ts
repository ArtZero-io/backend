import {formatNumberOutput, readOnlyGasLimit} from "../utils/utils";
import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import {launchpad_psp34_nft_standard} from "./launchpad_psp34_nft_standard";
let contract: ContractPromise;
export const setContract = (c: ContractPromise) => {
    contract = c;
};

export async function getPhaseScheduleById(
    api: ApiPromise,
    contract: ContractPromise,
    caller_account: string,
    phaseId: number
) {
    if (!contract || !caller_account) {
        return null;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await contract.query["psp34LaunchPadTraits::getPhaseScheduleById"](
        caller_account,
        { value: azero_value, gasLimit },
        phaseId
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getPhaseAccountLastIndex(
    api: ApiPromise,
    contract: ContractPromise,
    caller_account: string,
    phaseId: number
) {
    if (!contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await contract.query["psp34LaunchPadTraits::getPhaseAccountLastIndex"](
        caller_account,
        {
            value: azero_value,
            gasLimit,
        },
        phaseId
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getPhaseAccountLink(
    api: ApiPromise,
    contract: ContractPromise,
    caller_account: string,
    phaseId: number,
    index: number
) {
    if (!contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await contract.query["psp34LaunchPadTraits::getPhaseAccountLink"](
        caller_account,
        {
            value: azero_value,
            gasLimit,
        },
        phaseId,
        index
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getWhitelistByAccountId(
    api: ApiPromise,
    contract: ContractPromise,
    caller_account: string,
    phaseId: number,
    accountAddress: string
) {
    if (!contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await contract.query["psp34LaunchPadTraits::getWhitelistByAccountId"](
        caller_account,
        {
            value: azero_value,
            gasLimit,
        },
        accountAddress,
        phaseId
    );

    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAvailableTokenAmount(
    api: ApiPromise,
    contract: ContractPromise,
    caller_account:string,
) {
    if (!contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await contract.query["psp34LaunchPadTraits::getAvailableTokenAmount"](
        caller_account,
        {
            value: azero_value,
            gasLimit,
        }
    );
    console.log({result: result});
    console.log({output: output});
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getProjectInfo(launchpad_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!launchpad_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await launchpad_psp34_standard_contract.query["psp34LaunchPadTraits::getProjectInfo"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getOwner(launchpad_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!launchpad_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await launchpad_psp34_standard_contract.query['ownable::owner'](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getLastPhaseId(
    api: ApiPromise,
    launchpad_psp34_standard_contract: ContractPromise,
    caller_account:string
) {
    if (!launchpad_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } = await launchpad_psp34_standard_contract.query["psp34LaunchPadTraits::getLastPhaseId"](address, {
        value: azero_value,
        gasLimit,
    });
    if (result.isOk) {
        return formatNumberOutput(output);
    }
    return null;
}

export async function getPhaseAccountPublicClaimedAmount (
    api: ApiPromise,
    currentAccount: string,
    nftContractAddress: string,
    phaseId: number
):Promise<string | null> {
    if (!nftContractAddress || !currentAccount) {
        console.log("invalid inputs nftContractAddress || currentAccount");
        return null;
    }
    const contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        nftContractAddress
    );
    const address = currentAccount;
    const gasLimit = readOnlyGasLimit(api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } =
        await contract.query["psp34LaunchPadTraits::getPhaseAccountPublicClaimedAmount"](
            address,
            {
                value: azero_value,
                gasLimit,
            },
            address,
            phaseId
        );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getTotalSupply(launchpad_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!launchpad_psp34_standard_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await launchpad_psp34_standard_contract.query["psp34LaunchPadTraits::getTotalSupply"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk) {
        return formatNumberOutput(output);
    }
    return 0;
}