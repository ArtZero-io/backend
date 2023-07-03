import {ContractPromise} from "@polkadot/api-contract";
import {isValidAddressPolkadotAddress, readOnlyGasLimit, send_telegram_message} from "../utils/utils";

let marketplace_contract: ContractPromise;

export function isLoaded(): boolean {
    return !!marketplace_contract;
}

export function setContract(c: ContractPromise) {
    marketplace_contract = c;
}

export async function getVolumeByCollection(caller_account: string, nft_contract_address: string): Promise<number> {
    if (!marketplace_contract || !caller_account ||
        !isValidAddressPolkadotAddress(nft_contract_address)
    ) {
        console.log('invalid inputs');
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(marketplace_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await marketplace_contract.query["artZeroMarketplaceTrait::getVolumeByCollection"](
        address,
        {value: azero_value, gasLimit},
        nft_contract_address
    )
    if (result.isOk && output) {
        try {
            // @ts-ignore
            return output.toHuman()?.Ok.replace(/\,/g, "") / 10 ** 12;
        } catch (e) {
            send_telegram_message('getVolumeByCollection - ' + e.message);
            return 0;
        }
    }
    return 0;
}

export async function getNftSaleInfo(caller_account: string, nft_contract_address: string, token_id: {u64: number}) {
    if (!marketplace_contract || !caller_account ||
        !isValidAddressPolkadotAddress(nft_contract_address)
    ) {
        console.log('invalid inputs');
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(marketplace_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await marketplace_contract.query["artZeroMarketplaceTrait::getNftSaleInfo"](
        address,
        {value: azero_value, gasLimit},
        nft_contract_address, token_id
    )
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAllBids(caller_account: any, nft_contract_address: string, seller: string, token_id: {u64: number}) {
    if (
        !marketplace_contract ||
        !caller_account ||
        !isValidAddressPolkadotAddress(nft_contract_address) ||
        !isValidAddressPolkadotAddress(seller)
    ) {
        console.log("invalid inputs");
        return null;
    }
    const address = caller_account?.address;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(marketplace_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await marketplace_contract.query["artZeroMarketplaceTrait::getAllBids"](
        address,
        {value: azero_value, gasLimit},
        nft_contract_address,
        seller,
        token_id
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}