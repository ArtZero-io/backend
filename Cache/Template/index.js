require('dotenv').config({path: '/home/ubuntu/htdocs/backend/Api/.env'});
let mongoose = require('mongoose');
let database = require('../../database.js');
let axios = require('axios');
let FormData = require('form-data');
let fs = require('fs');

const connectDb = () => {
  console.log(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`);
  return mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {useNewUrlParser: true});
};

connectDb().then(async () => {
  // Checking the configs before running
  let total_supply = 10000;
  let image_ipfs_link = "ipfs://bafybeicuufb2745l5g5zm2fa32fydao76iur72lwaqrt7dmhzkdupmzxue/";
  let json_ipfs_link = "ipfs://bafybeibw7yco54n24gieazxya2zt3gfujvrv5twed4xheruv3izyuar2ry/";
  let collection_address = "5F4fBoxKBwXZ5fprZPtkhXtesR7PXEWny6KqwWEHbZWXkg55";
  let collection_name = 'PMP';

  // //Step 1: Cache images 
  console.log("Caching " + collection_name + " Images...");
  for (var i=1; i<= total_supply; i++) {
    let image_ipfs_link_i = image_ipfs_link + i + ".png";
    image_ipfs_link_i = image_ipfs_link_i.replace("ipfs://","/ipfs/");
    console.log('image_ipfs_link_i', image_ipfs_link_i);
    let input_data = await database.Images.findOne({input:image_ipfs_link_i});
    if (input_data) continue;
    let image_path = '/home/ubuntu/htdocs/share_cache/Cache/' + collection_name + '/images/' + i + '.png';
    let cloud_flare_image_custom_id = collection_name + '/nfts/' + i;
    await database.Images.create({
      input:image_ipfs_link_i,
      isCloudFlare: true,
      location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
      location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
      location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
      location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
      location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100'
    });
    console.log('Cached image ' + i + '.png');
  }

  // Step 2: Cache jsons
  console.log("Caching " + collection_name + " Jsons...");
  for (var i=1; i<=total_supply; i++){

    let json_ipfs_link_i = json_ipfs_link + i + ".json";
    json_ipfs_link_i = json_ipfs_link_i.replace("ipfs://","/ipfs/");
  
    let input_data = await database.JSON.findOne({input:json_ipfs_link_i});
    if (input_data) continue;
  
    await database.JSON.create({
      input:json_ipfs_link_i,
      location: "/home/ubuntu/htdocs/share_cache/Cache/" + collection_name + "/jsons/" + i + ".json"
    });
    console.log("/home/ubuntu/htdocs/share_cache/Cache/" + collection_name + "/jsons/" + i + ".json");
    console.log('added to JSON',json_ipfs_link_i);
  }

  // Step 3: Update NFT
  console.log("Update Request " + collection_name + " NFTs...");
  for (var i=1; i<=total_supply; i++){
    let queue_data = await database.NFTQueue.findOne({nftContractAddress:collection_address,tokenID:i});
    if (!queue_data){
      console.log('added to NFT queue',i);
      await database.NFTQueue.create({"type":"update",nftContractAddress:collection_address,tokenID:i});
    }
  }
});
