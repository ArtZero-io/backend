import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {convertNumberWithoutCommas, readOnlyGasLimit} from "../utils/utils";
import dotenv from "dotenv";
import {AzeroDomainEventRepository} from "../repositories";
dotenv.config();

let contract: ContractPromise;
export const setContract = (c: ContractPromise) => {
    contract = c;
};
export async function getTotalSupply(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query[
        "psp34::totalSupply"
        ](address, {value: azero_value, gasLimit});
    if (result.isOk && output) {
        // @ts-ignore
        return parseInt(convertNumberWithoutCommas(output.toHuman()?.Ok));
        // return new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le").toNumber();
    }
    return 0;
}

export async function isLockedNft(nft721_psp34_standard_contract: ContractPromise, caller_account: string, tokenId: {u64: number} | {bytes: string}) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::isLockedNft"](
        address,
        {value: azero_value, gasLimit},
        tokenId
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAttributeName(nft721_psp34_standard_contract: ContractPromise, caller_account: string, attributeIndex: number) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getAttributeName"](
        address,
        {value: azero_value, gasLimit},
        attributeIndex
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAttributeCount(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return 0;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getAttributeCount"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
    }
    return 0;
}

export async function getAttribute(
    nft721_psp34_standard_contract: ContractPromise,
    caller_account: string,
    tokenId: string,
    attribute: any[]) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Metadata::getAttribute"](
        address,
        {value: azero_value, gasLimit},
        tokenId,
        attribute
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function getAttributes(
    nft721_psp34_standard_contract: ContractPromise,
    caller_account: string,
    tokenId: { u64: number },
    attributes: any[]
) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getAttributes"](
        address,
        {value: azero_value, gasLimit},
        tokenId,
        attributes
    );
    // console.log(attributes);
    // console.log({result: result?.toHuman()});
    // console.log({output: output?.toHuman()});
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function ownerOf(
    nft721_psp34_standard_contract: ContractPromise,
    caller_account: string,
    tokenId: number
) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34::ownerOf"](
        address,
        {value: azero_value, gasLimit},
        {u64: tokenId}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }

    return null;
}

export async function getLastTokenId(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getLastTokenId"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return parseInt(convertNumberWithoutCommas(output.toHuman()?.Ok));
    }
    return null;
}

// Used for AzeroDomain only
export async function totalSupply(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34::totalSupply"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        console.log(result.toHuman());
        console.log(output.toHuman());
        // @ts-ignore
        return parseInt(convertNumberWithoutCommas(output.toHuman()?.Ok));
        // return (new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le")).toNumber();
        // return new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le").toNumber();
    }
    return null;
}