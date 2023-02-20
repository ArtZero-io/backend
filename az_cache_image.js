require("dotenv").config({ path: __dirname + "/.env" });
const isIPFS = require('is-ipfs');
let mongoose = require('mongoose');
let database = require('./database.js');
const download = require('download');
let  { todayFolder,getFileTypeFromCID,delay,splitFileName,randomString } = require("./utils.js");
const sharp = require('sharp');
const fs = require('fs');
let FileType = require('file-type');
let {send_telegram_message} = require("./utils.js");
const IPFS_BASE_URL = "https://artzero.infura-ipfs.io/ipfs/";
//const IPFS_BASE_URL = "https://ipfs.io/ipfs/";
//const INFURA_IPFS_BASE_URL = "https://ipfs.infura.io/ipfs/";
const INFURA_IPFS_BASE_URL = "https://artzeronft.infura-ipfs.io/ipfs/";

const PUBLIC_PINATA_IPFS_BASE_URL = "https://gateway.pinata.cloud/ipfs/";
const AZ_PINATA_IPFS_BASE_URL = "https://artzero.mypinata.cloud/ipfs/";
const IPFS_CLIENT_URL = "https://ipfs.infura.io:5001/api/v0";

var global_vars = {}
let ipfs = null;

const check_Image_queue = async () =>{
  if (global_vars.is_check_Image_queue) return;
  global_vars.is_check_Image_queue = true;

  console.log('Checking for Image Queue ...');
  let queue_data = await database.ImageQueue.find({});
  let records_length = queue_data.length;
  console.log('Image Queue length:',records_length);

  for (var j=0;j<records_length;j++){
    console.log(queue_data[j]);
    let input = queue_data[j].input;
    let is1024 = queue_data[j].is1024;
    let is1440 = queue_data[j].is1440;
    let is1920 = queue_data[j].is1920;
    let is500 = queue_data[j].is500;
    let is100 = queue_data[j].is100;
    input = input.replace("ipfs://","/ipfs/");
    // console.log('is CID',isIPFS.cid(input));
    // console.log('is url',isIPFS.url(input));
    // console.log('is path',isIPFS.path(input));

    const filePath = `${__dirname}/images_cache/` + todayFolder();
    if (!fs.existsSync(filePath)){
        fs.mkdirSync(filePath,{recursive: true});
    }
    try {
      if (isIPFS.path(input)) {
        // let fileType = await getFileTypeFromCID(ipfs,input);

        let removed_input = input.replace('/ipfs/','');

        const fileURL = INFURA_IPFS_BASE_URL + removed_input;
        console.log('Downloading IPFS Path',fileURL);

        let fileName = randomString(5);

        await download(fileURL,filePath,{filename:fileName})
        .then(async (content) => {
          let fileType =  await FileType.fromBuffer(content, {
            length: 100 // or however many bytes you need
          });
          console.log(fileType);

          let fullPath = filePath + "/" + fileName;
          console.log('Download Completed',fullPath);
          if (is1024){
            await sharp(fullPath)
            .resize({ width: 1024 })
            .toFile(filePath + "/" + fileName + "_1024."+ fileType.ext);
            console.log('Resizer 1024 Completed');
          }
          if (is1440){
            await sharp(fullPath)
            .resize({ width: 1440 })
            .toFile(filePath + "/" + fileName + "_1440."+ fileType.ext);
            console.log('Resizer 1440 Completed');
          }
          if (is1920){
            await sharp(fullPath)
            .resize({ width: 1920 })
            .toFile(filePath + "/" + fileName + "_1920."+ fileType.ext);
            console.log('Resizer 1920 Completed');
          }
          if (is500){
            //Resize 500
            await sharp(fullPath)
            .resize({ width: 500 })
            .toFile(filePath + "/" + fileName + "_500."+ fileType.ext);
            console.log('Resizer 500 Completed');
          }
          if (is100){
            //Resize 100
            await sharp(fullPath)
            .resize({ width: 100 })
            .toFile(filePath + "/" + fileName + "_100."+ fileType.ext);
            console.log('Resizer 100 Completed');
          }
          let found = await database.Images.findOne({input:input});
          if (!found){
            await database.Images.create({
              input:input,
              isCloudFlare: false,
              locationOrigin: fullPath,
              location1440: is1440 ? filePath + "/" + fileName + "_1440."+ fileType.ext : "",
              location1920: is1920 ? filePath + "/" + fileName + "_1920."+ fileType.ext : "",
              location1024: is1024 ? filePath + "/" + fileName + "_1024."+ fileType.ext : "",
              location500:filePath + "/" + fileName + "_500."+ fileType.ext,
              location100:filePath + "/" + fileName + "_100."+ fileType.ext,
            });
          }
          else {
            let obj = {};
            obj.isCloudFlare = false;
            if (is1440) obj.location1440 =  is1440 ? filePath + "/" + fileName + "_1440."+ fileType.ext : "";
            if (is1920) obj.location1920 =  is1920 ? filePath + "/" + fileName + "_1920."+ fileType.ext : "";
            if (is1024) obj.location1024 =  is1024 ? filePath + "/" + fileName + "_1024."+ fileType.ext : "";
            if (is500) obj.location500 =  is500 ? filePath + "/" + fileName + "_500."+ fileType.ext : "";
            if (is100) obj.location100 =  is100 ? filePath + "/" + fileName + "_100."+ fileType.ext : "";
            await database.Images.updateOne({input : input},obj);
          }

          // await fs.unlinkSync(fullPath);
          await database.ImageQueue.deleteOne({input : input});
          await delay(3000);
        });
      } else if (isIPFS.cid(input)){
        console.log('Downloading CID',input);

        const file = INFURA_IPFS_BASE_URL + input;
        console.log(file);
        await download(file,filePath)
        .then(async (content) => {

          let fileType =  await FileType.fromBuffer(content, {
            length: 100 // or however many bytes you need
          });
          if (fileType == undefined) {
            return;
          }
          if (fileType.ext == 'apng') {
            fileType.ext = 'png';
          }
          let fullPath = filePath + "/" + input + "." + fileType.ext;
          console.log('Download Completed',fullPath);
          if (fileType.ext != "gif"){
            if (is1024){
              //Resize 1024
              await sharp(fullPath)
              .resize({ width: 1024 })
              .toFile(filePath + "/" + input + "_1024."+ fileType.ext);
              console.log('Resizer 1024 Completed');
            }
            if (is1440){
              await sharp(fullPath)
              .resize({ width: 1440 })
              .toFile(filePath + "/" + input + "_1440."+ fileType.ext);
              console.log('Resizer 1440 Completed');
            }
            if (is1920){
              await sharp(fullPath)
              .resize({ width: 1920 })
              .toFile(filePath + "/" + input + "_1920."+ fileType.ext);
              console.log('Resizer 1920 Completed');
            }
            if (is500){
              //Resize 500
              await sharp(fullPath)
              .resize({ width: 500 })
              .toFile(filePath + "/" + input + "_500."+ fileType.ext);
              console.log('Resizer 500 Completed');
            }
            if (is100){
              //Resize 100
              await sharp(fullPath)
              .resize({ width: 100 })
              .toFile(filePath + "/" + input + "_100."+ fileType.ext);
              console.log('Resizer 100 Completed');
            }
            let found = await database.Images.findOne({input:input});
            if (!found){
              await database.Images.create({
                input:input,
                isCloudFlare: false,
                locationOrigin: fullPath,
                location1920: is1920 ? filePath + "/" + input + "_1920."+ fileType.ext : "",
                location1440: is1440 ? filePath + "/" + input + "_1440."+ fileType.ext : "",
                location1024: is1024 ? filePath + "/" + input + "_1024."+ fileType.ext : "",
                location500: filePath + "/" + input + "_500."+ fileType.ext,
                location100: filePath + "/" + input + "_100."+ fileType.ext
              });
            }
            else {
              let obj = {};
              obj.isCloudFlare = false;
              if (is1440) obj.location1440 =  is1440 ? filePath + "/" + input + "_1440."+ fileType.ext : "";
              if (is1920) obj.location1920 =  is1920 ? filePath + "/" + input + "_1920."+ fileType.ext : "";
              if (is1024) obj.location1024 =  is1024 ? filePath + "/" + input + "_1024."+ fileType.ext : "";
              if (is500) obj.location500 =  is500 ? filePath + "/" + input + "_500."+ fileType.ext : "";
              if (is100) obj.location100 =  is100 ? filePath + "/" + input + "_100."+ fileType.ext : "";
              await database.Images.updateOne({input : input},obj);
            }

            // await fs.unlinkSync(fullPath);
          }
          else{
            let found = await database.Images.findOne({input:input});
            if (!found){
              await database.Images.create({
                input:input,
                isCloudFlare: false,
                locationOrigin: fullPath,
                location1920: fullPath,
                location1440: fullPath,
                location1024: fullPath,
                location500: fullPath,
                location100: fullPath
              });
            }
            else {
              let obj = {};
              obj.isCloudFlare = false;
              if (is1440) obj.location1440 =  fullPath;
              if (is1920) obj.location1920 =  fullPath;
              if (is1024) obj.location1024 =  fullPath;
              if (is500) obj.location500 =  fullPath;
              if (is100) obj.location100 =  fullPath;
              await database.Images.updateOne({input : input},obj);
            }
          }

          await database.ImageQueue.deleteOne({input : input});
          await delay(3000);
        })
      }

      //Not recognize
      await database.ImageQueue.deleteOne({input : input});
    }
    catch(e){
      console.log(e);
      continue;
    }



  }

  global_vars.is_check_Image_queue = false;
}

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};
connectDb().then(async () => {
  console.log(`ARTZERO Image Caching Service is active!`);
  // try{
  //   ipfs = await create(IPFS_CLIENT_URL);
  //   console.log("IPFS ready");
  // }
  // catch (e){
  //   console.log(e);
  // }

  global_vars.is_check_Image_queue = false;

  setInterval(check_Image_queue, 5 * 1000);
});
