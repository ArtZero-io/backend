import BN from "bn.js";
import {convertNumberWithoutCommas, isValidAddressPolkadotAddress, readOnlyGasLimit} from "../utils/utils";
import {ContractPromise} from "@polkadot/api-contract";
import {ApiPromise} from "@polkadot/api";
import {azero_domains_nft} from "./azero_domains_nft";
import {AzeroDomainEventRepository} from "../repositories";

let azero_domain_nft_contract: ContractPromise;

export function setContract(c: ContractPromise) {
    azero_domain_nft_contract = c;
}

export const setAzeroDomainsNFTContract = (api: ApiPromise) => {
    azero_domain_nft_contract = new ContractPromise(
        api,
        azero_domains_nft.CONTRACT_ABI,
        azero_domains_nft.CONTRACT_ADDRESS
    );
};

export async function balanceOf(
    api: ApiPromise,
    caller_account: string,
    account: string
): Promise<number> {
    try {
        if (!azero_domain_nft_contract || !caller_account || !account) {
            return 0;
        }
        const address = caller_account;
        const gasLimit = readOnlyGasLimit(api);
        const azero_value = 0;

        const {result, output} = await azero_domain_nft_contract.query["psp34::balanceOf"](
            address,
            {value: azero_value, gasLimit},
            account
        );
        if (result.isOk && output) {
            // @ts-ignore
            const ret = output.toHuman()?.Ok;
            return parseInt(ret.replaceAll(",", ""));
        }
    } catch (e) {
        console.log(`ERROR: ${e.messages}`);
    }
    return 0;
}

export async function totalSupply(
    caller_account: string
): Promise<number | null> {
    if (!azero_domain_nft_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(azero_domain_nft_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await azero_domain_nft_contract.query["psp34::totalSupply"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return parseInt(convertNumberWithoutCommas(output.toHuman()?.Ok));
    }
    return 0;
}

export async function ownerOf(
    caller_account: string,
    domainName: string,
): Promise<string | null> {
    if (!azero_domain_nft_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(azero_domain_nft_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await azero_domain_nft_contract.query["psp34::ownerOf"](
        address,
        {value: azero_value, gasLimit},
        {bytes: domainName}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getNftOwner(
    caller_account: string,
    domainName: string,
): Promise<string | null> {
    if (!azero_domain_nft_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(azero_domain_nft_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await azero_domain_nft_contract.query["getOwner"](
        address,
        {value: azero_value, gasLimit},
        domainName
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok?.Ok;
    }
    return null;
}

export async function getRegistrationPeriod(
    callerCccount: string,
    domainName: string,
): Promise<any[]> {
    if (!azero_domain_nft_contract || !callerCccount) {
        return [];
    }
    const address = callerCccount;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(azero_domain_nft_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await azero_domain_nft_contract.query["getRegistrationPeriod"](
        address,
        {value: azero_value, gasLimit},
        domainName
    );
    if (result.isOk && output) {
        const ret = output.toHuman();
        console.log(ret);
        // @ts-ignore
        return ret?.Ok?.Ok;
    }
    return [];
}

