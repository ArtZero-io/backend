let { decodeAddress, encodeAddress } = require("@polkadot/keyring");
let { hexToU8a, isHex, BN, BN_ONE } = require("@polkadot/util");
const toStream = require('it-to-stream');
let FileType = require('file-type');
let axios = require("axios");
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);

module.exports.send_telegram_message = async (message) => {

    const { data } = await axios({
      baseURL: process.env.TELEGRAM_URL,
      url: "/sendMessage",
      method: "post",
      data: {
        "chat_id": process.env.TELEGRAM_ID_CHAT,
        "text": message
      },
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        'Access-Control-Allow-Origin': '*',
      },
    });
}

module.exports.convertNumberWithoutCommas = function (input) {
    return input.replace(/,/g, "");
}


module.exports.splitFileName = function (path) {
    return str.split('\\').pop().split('/').pop();
}

module.exports.randomString = function (length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports.getFileTypeFromCID = async function (ipfs,cid) {

  let fileExt =  await FileType.fromStream(toStream(ipfs.cat(cid, {
    length: 100 // or however many bytes you need
  })));
  return fileExt;
}


module.exports.isValidAddressPolkadotAddress = function (address) {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    //console.log(error);
    return false;
  }
}

module.exports.delay = function (timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

module.exports.todayFolder = function () {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months = require(1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hour = dateObj.getHours();

  return year + "/" + month + "/" + day + "/" + hour;
};

const client = async (
  method,
  url,
  options = {},
  baseURL = process.env.REACT_APP_API_BASE_URL
) => {
  const headers = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const urlencodedOptions = new URLSearchParams(
    Object.entries(options)
  ).toString();

  const { data } = await axios({
    baseURL,
    url,
    method,
    headers,
    data: urlencodedOptions,
  });

  const { status, ret, message } = data;

  if (status === "OK") {
    return ret;
  }

  if (status === "FAILED") {
    return message;
  }

  return data;
};

module.exports.APICall = {
  getMetadataOffChain: async ({ tokenUri, tokenID }) => {
    const ret = await client(
      "GET",
      `/getJSON?input=${tokenUri}${tokenID}.json`,
      {}
    );

    console.log("getMetadataOffChain ret", ret);
    return ret;
  },
};

module.exports.readOnlyGasLimit = async function (api) {
  return api.registry.createType("WeightV2", {
    refTime: new BN(1_000_000_000_000),
    proofSize: MAX_CALL_WEIGHT,
  });
};