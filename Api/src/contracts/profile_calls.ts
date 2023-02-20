import {ContractPromise} from "@polkadot/api-contract";
import {readOnlyGasLimit} from "../utils/utils";

let profile_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    profile_contract = c;
}

export async function getAttributes(
    caller_account: string,
    accountAddress: string,
    attributes: any[]
) {
    if (!profile_contract || !caller_account) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(profile_contract.api);
    const azero_value = 0;
    let attributeVals;
    const {result, output} = await profile_contract.query.getAttributes(
        address,
        {
            value: azero_value,
            gasLimit,
        },
        accountAddress,
        attributes
    );
    if (result.isOk && output) {
        // @ts-ignore
        attributeVals = output.toHuman()?.Ok;
    }
    return attributeVals;
}