import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {isValidAddressPolkadotAddress, readOnlyGasLimit, send_telegram_message} from "../utils/utils";

let collection_manager_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    collection_manager_contract = c;
}

export async function getCollectionCount(caller_account: string): Promise<number> {
    if (!collection_manager_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(collection_manager_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await collection_manager_contract.query["artZeroCollectionTrait::getCollectionCount"](
        address,
        {
            value: azero_value,
            gasLimit,
        });
    if (result.isOk && output) {
        // @ts-ignore
        // return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
        return output.toHuman()?.Ok?.replaceAll(",", "");
        // return new BN(output.toHuman()?.Ok?.replaceAll(",", ""));
        // return new BN(output.toHuman()?.Ok, 10, "le");
    }
    return 0;
}

export async function getContractById(caller_account: string, collection_id: number) {
    if (!collection_manager_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(collection_manager_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} =
        await collection_manager_contract.query["artZeroCollectionTrait::getContractById"](
            address,
            {value: azero_value, gasLimit},
            collection_id
        );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getCollectionByAddress(caller_account: string, collection_address: string) {
    if (
        !collection_manager_contract ||
        !caller_account ||
        !isValidAddressPolkadotAddress(collection_address)
    ) {
        return null;
    }
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(collection_manager_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} =
        await collection_manager_contract.query["artZeroCollectionTrait::getCollectionByAddress"](
            caller_account,
            {value: azero_value, gasLimit},
            collection_address
        );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAttributes(caller_account: string, nft_contract_address: string, attributes: any[]) {
    if (!collection_manager_contract || !caller_account) {
        return null;
    }
    let attributeVals;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(collection_manager_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const { result, output } =
        await collection_manager_contract.query["artZeroCollectionTrait::getAttributes"](
            caller_account,
            { value: azero_value, gasLimit },
            nft_contract_address,
            attributes
        );
    if (result.isOk && output) {
        // @ts-ignore
        attributeVals = output.toHuman()?.Ok;
    }
    return attributeVals;
}