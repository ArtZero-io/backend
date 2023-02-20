import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {convertNumberWithoutCommas, readOnlyGasLimit} from "../utils/utils";

export async function getTotalSupply(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    const {result, output} = await nft721_psp34_standard_contract.query[
        "psp34::totalSupply"
        ](address, {value: azero_value, gasLimit});
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le").toNumber();
    }
    return null;
}

export async function isLockedNft(nft721_psp34_standard_contract: ContractPromise, caller_account: string, tokenId: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
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
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getAttributeCount"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(output.toHuman()?.Ok, 10, "le").toNumber();
    }
    return null;
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
    tokenId: { u64: string },
    attributes: any[]
) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api);
    const azero_value = 0;
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getAttributes"](
        address,
        {value: azero_value, gasLimit},
        tokenId,
        attributes
    );
    if (result.isOk && output) {
        // @ts-ignore
        return output.toHuman()?.Ok;
    }
    return null;
}

export async function ownerOf(
    nft721_psp34_standard_contract: ContractPromise,
    caller_account: string,
    tokenId: string
) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    const {result, output} = await nft721_psp34_standard_contract.query["psp34::ownerOf"](
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

export async function getLastTokenId(nft721_psp34_standard_contract: ContractPromise, caller_account: string) {
    if (!nft721_psp34_standard_contract || !caller_account) {
        return null;
    }
    const address = caller_account;
    // @ts-ignore
    const gasLimit = readOnlyGasLimit(nft721_psp34_standard_contract.api)
    const azero_value = 0;
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getLastTokenId"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        // @ts-ignore
        return new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le").toNumber();
    }
    return null;
}