import {ContractPromise} from "@polkadot/api-contract";
import BN from "bn.js";
import {convertNumberWithoutCommas, readOnlyGasLimit, readOnlyGasLimitAstar} from "../utils/utils";
import {KeyringPair} from "@polkadot/keyring/types";
import axios from "axios";
import {logger} from "../scripts/GenerateNftAttributes";
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

export async function isLockedNft(nft721_psp34_standard_contract: ContractPromise, caller_account: string, tokenId: {u64: number}) {
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
    tokenId: {u64: number}
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
    // @ts-ignore
    const {result, output} = await nft721_psp34_standard_contract.query["psp34Traits::getLastTokenId"](
        address,
        {value: azero_value, gasLimit}
    );
    if (result.isOk && output) {
        console.log(output.toHuman());
        // @ts-ignore
        return parseInt(convertNumberWithoutCommas(output.toHuman()?.Ok));
        // return (new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le")).toNumber();
        // return new BN(convertNumberWithoutCommas(output.toHuman()?.Ok), 10, "le").toNumber();
    }
    return null;
}

export async function mintNewNft(
    keypair: KeyringPair,
    nft721_psp34_standard_contract: ContractPromise,
    tokenId: number,
    urlUpdateNft: string,
    collectionAddress: string
): Promise<string | undefined> {
    // @ts-ignore
    const gasLimit = readOnlyGasLimitAstar(nft721_psp34_standard_contract.api);
    const value = 0;
    // const gasLimit = 6 * 100000000;
    // const value = 0;

    await nft721_psp34_standard_contract.tx.mint({ gasLimit, value })
        // await nft721_psp34_standard_contract.tx.mint({})
        .signAndSend(keypair, async result => {
            if (result.status.isInBlock) {
                console.log(`InBlock for NFT ${tokenId} of collection ${collectionAddress}`);
                // @ts-ignore
                logger.info(`InBlock: ${result.toHuman()?.status?.InBlock}`);
            } else if (result.status.isFinalized) {
                console.log(`In finalized for NFT ${tokenId} of collection ${collectionAddress}`);
                // @ts-ignore
                logger.info(`Finalized: ${result.toHuman()?.status?.Finalized}`);
                try {
                    const headers = {
                        Accept: "*/*",
                        "Content-Type": "application/x-www-form-urlencoded",
                    };
                    const res = await axios.post(
                        urlUpdateNft,
                        {
                            collection_address: collectionAddress,
                            token_id: tokenId
                        },
                        {
                            headers: headers
                        });
                    logger.info(res);
                } catch (e) {
                    logger.error(e.message);
                }
            }
        })
        .catch((e) => console.log("e", e));
    return undefined;
}