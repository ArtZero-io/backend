require("dotenv").config({ path: __dirname + "/.env" });

let { ApiPromise, WsProvider } = require("@polkadot/api");
let { ContractPromise } = require("@polkadot/api-contract");
let jsonrpc = require("@polkadot/types/interfaces/jsonrpc");
let { numberToU8a, stringToHex } = require("@polkadot/util");
let { convertNumberWithoutCommas } = require("./utils.js");
let mongoose = require("mongoose");
let database = require("./database.js");
let { launchpad_manager } = require("./Contracts/launchpad_manager.js");
let launchpad_manager_calls = require("./Contracts/launchpad_manager_calls.js");
let {
  launchpad_psp34_nft_standard,
} = require("./Contracts/launchpad_psp34_nft_standard.js");
let launchpad_psp34_nft_standard_calls = require("./Contracts/launchpad_psp34_nft_standard_calls.js");
let axios = require("axios");
let { send_telegram_message } = require("./utils.js");
const removeDB = async () => {
  await database.Projects.remove({});
  console.log("Projects DB cleared");
};

const check_new_projects = async () => {
  if (global_vars.is_check_new_projects) return;
  global_vars.is_check_new_projects = true;
  try {
    console.log("Checking New Projects ...");
    let project_count_contract = await launchpad_manager_calls.getProjectCount(
      global_vars.caller
    );
    console.log("Projects Count in Contract", project_count_contract);
    global_vars.project_count_contract = project_count_contract;

    let project_count_db = await database.Projects.countDocuments({});
    console.log("Project Count in DB", project_count_db);
    global_vars.project_count_db = project_count_db;
    if (project_count_db < project_count_contract) {
      for (var i = project_count_db + 1; i <= project_count_contract; i++) {
        let project_contract_address =
          await launchpad_manager_calls.getProjectById(global_vars.caller, i);
        const project_contract = new ContractPromise(
          api,
          launchpad_psp34_nft_standard.CONTRACT_ABI,
          project_contract_address
        );
        console.log("Project Contract Address", project_contract_address);
        let project_data = await launchpad_manager_calls.getProjectByNftAddress(
          global_vars.caller,
          project_contract_address
        );
        console.log("Project Data", project_data);
        let project_information_hash =
          await launchpad_psp34_nft_standard_calls.getProjectInfo(
            project_contract,
            global_vars.caller
          );
        console.log("Project Information Hash", project_information_hash);
        let owner_project_address =
          await launchpad_psp34_nft_standard_calls.getOwner(
            project_contract,
            global_vars.caller
          );
        console.log("Owner Project Address", owner_project_address);
        if (project_information_hash && project_data) {
          const { data } = await axios({
            url: `https://artzeronft.infura-ipfs.io/ipfs/${project_information_hash}`,
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "cache-control": "no-cache",
              "Access-Control-Allow-Origin": "*",
            },
          });
          console.log("data xx>>", data);
          let found = await database.Projects.findOne({
            nftContractAddress: project_contract_address,
          });
          if (!found) {
            var obj = {
              index: i,
              collectionOwner: owner_project_address,
              nftContractAddress: project_contract_address,
              isActive: project_data.isActive,
              name: data.name,
              description: data.description,
              teamMembers: JSON.stringify(data.team_members),
              roadmaps: JSON.stringify(data.roadmaps),
              avatarImage: data.avatar,
              squareImage: data.headerSquare,
              headerImage: data.header,
              website: data.website,
              twitter: data.twitter,
              discord: data.discord,
              telegram: data.telegram,
              nftName: data.nft_name,
              nftSymbol: data.nft_symbol,
              startTime: convertNumberWithoutCommas(project_data.startTime),
              endTime: convertNumberWithoutCommas(project_data.endTime),
              nft_count: convertNumberWithoutCommas(project_data.totalSupply),
            };
            console.log("Project Data", obj);
            await database.Projects.create(obj);
          }
        }
      }
    }
  } catch (e) {
    send_telegram_message("check_new_projects - " + e.message);
    console.log(e);
    global_vars.is_check_new_projects = false;
  }

  global_vars.is_check_new_projects = false;
};

const check_project_queue = async () => {
  if (global_vars.is_check_new_projects) return;
  global_vars.is_check_new_projects = true;
  try {
    console.log("Checking for Project Queue ...");
    let queue_data = await database.ProjectQueue.find({});
    let records_length = queue_data.length;
    console.log("Project queue length:", records_length);
    for (var j = 0; j < records_length; j++) {
      let project_contract_address = queue_data[j].nftContractAddress;
      const project_contract = new ContractPromise(
        api,
        launchpad_psp34_nft_standard.CONTRACT_ABI,
        project_contract_address
      );
      console.log("Project Contract Address", project_contract_address);
      let project_data = await launchpad_manager_calls.getProjectByNftAddress(
        global_vars.caller,
        project_contract_address
      );
      console.log("Project Data", project_data);
      let project_information_hash =
        await launchpad_psp34_nft_standard_calls.getProjectInfo(
          project_contract,
          global_vars.caller
        );
      console.log("Project Information Hash", project_information_hash);
      let owner_project_address =
        await launchpad_psp34_nft_standard_calls.getOwner(
          project_contract,
          global_vars.caller
        );
      console.log("Owner Project Address", owner_project_address);
      if (project_information_hash && project_data) {
        console.log("Passing check project information and project data");
        const { data } = await axios({
          url: `https://artzeronft.infura-ipfs.io/ipfs/${project_information_hash}`,
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log("xx>> check_project_queue data ", data);
        var obj = {
          collectionOwner: owner_project_address,
          nftContractAddress: project_contract_address,
          isActive: project_data.isActive,
          name: data.name,
          description: data.description,
          teamMembers: JSON.stringify(data.team_members),
          roadmaps: JSON.stringify(data.roadmaps),
          avatarImage: data.avatar,
          squareImage: data.headerSquare,
          headerImage: data.header,
          website: data.website,
          twitter: data.twitter,
          discord: data.discord,
          telegram: data.telegram,
          nftName: data.nft_name,
          nftSymbol: data.nft_symbol,
          startTime: convertNumberWithoutCommas(project_data.startTime),
          endTime: convertNumberWithoutCommas(project_data.endTime),
          nft_count: convertNumberWithoutCommas(project_data.totalSupply),
        };
        console.log(obj);
        await database.Projects.updateOne(
          { nftContractAddress: project_contract_address },
          obj
        );
        await database.ProjectQueue.deleteOne({
          nftContractAddress: project_contract_address,
        });

        console.log("updated", project_contract_address, obj);
      }
    }
  } catch (e) {
    send_telegram_message("check_project_queue - " + e.message);
    console.log(e.message);
    global_vars.is_check_new_projects = false;
  }

  global_vars.is_check_new_projects = false;
};

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
  });
};

var global_vars = {};
var api = null;

connectDb().then(async () => {
  console.log(`ARTZERO Project Monitoring is active!`);
  console.log("Caller Address:", process.env.CALLER);

  global_vars.caller = process.env.CALLER;

  const provider = new WsProvider(process.env.WSSPROVIDER);
  api = new ApiPromise({
    provider,
    rpc: jsonrpc,
    types: {
      ContractsPsp34Id: {
        _enum: {
          U8: "u8",
          U16: "u16",
          U32: "u32",
          U64: "u64",
          U128: "u128",
          Bytes: "Vec<u8>",
        },
      },
    },
  });
  api.on("connected", () => {
    api.isReady.then((api) => {
      console.log("Smartnet AZERO Connected");
    });
  });

  api.on("ready", () => {
    console.log("Smartnet AZERO Ready");
    const launchpad_contract = new ContractPromise(
      api,
      launchpad_manager.CONTRACT_ABI,
      launchpad_manager.CONTRACT_ADDRESS
    );
    console.log("Project Contract is ready");
    launchpad_manager_calls.setContract(launchpad_contract);

    global_vars.is_check_new_projects = false;
    global_vars.is_check_project_queue = false;
    setInterval(check_new_projects, 5 * 1000);
    setInterval(check_project_queue, 6 * 1000);
  });

  api.on("error", (err) => {
    console.log("error", err);
  });
});
