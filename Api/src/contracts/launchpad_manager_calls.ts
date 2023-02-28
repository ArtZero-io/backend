import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {readOnlyGasLimit} from "../utils/utils";

let launchpad_manager_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    launchpad_manager_contract = c;
}

export async function getProjectCount(caller_account: string) {
    if (!launchpad_manager_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_manager_contract.api);
    const azero_value = 0;
    const {result, output} =
        await launchpad_manager_contract.query.getProjectCount(address, {
            value: azero_value,
            gasLimit,
        });
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
    }
    return 0;
}

export async function getProjectById(caller_account: string, projectId: number) {
    if (!launchpad_manager_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_manager_contract.api);
    const azero_value = 0;
    const {result, output} =
        await launchpad_manager_contract.query.getProjectById(
            address,
            {
                value: azero_value,
                gasLimit
            },
            projectId
        );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getProjectByNftAddress(caller_account: string, nftContractAddress: string) {
    if (!launchpad_manager_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_manager_contract.api);
    const azero_value = 0;
    const {result, output} =
        await launchpad_manager_contract.query.getProjectByNftAddress(
            address,
            {
                value: azero_value,
                gasLimit,
            },
            nftContractAddress
        );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

