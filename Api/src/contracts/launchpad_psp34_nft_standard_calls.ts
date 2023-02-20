import {readOnlyGasLimit} from "../utils/utils";
import {ContractPromise} from "@polkadot/api-contract";

export async function getProjectInfo(launchpad_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!launchpad_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(launchpad_psp34_standard_contract.api);
    const azero_value = 0;
    const {result, output} = await launchpad_psp34_standard_contract.query.getProjectInfo(
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