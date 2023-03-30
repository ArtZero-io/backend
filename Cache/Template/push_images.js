require('dotenv').config({path: '/home/azero/htdocs/backend/Api/.env'});
let mongoose = require('mongoose');
let database = require('../../database.js');
let axios = require('axios');
let FormData = require('form-data');
let fs = require('fs');
let { send_telegram_message } = require("../../utils.js");

const connectDb = async () => {  
    // Checking the configs before running
    let total_supply = 5000;
    let collection_name = 'PMP';

    // //Step 1: Cache images 
    console.log("Caching " + collection_name + " Images...");
    for (var i=1070; i<= total_supply; i++) {
      let image_path = '/home/azero/htdocs/share_cache/Cache/' + collection_name + '/images/' + i + '.png';
      let cloud_flare_image_custom_id = collection_name + '/nfts/' + i;
      console.log(process.env.CLOUDFLARE_API_KEY);
      try {
        let form = new FormData();
        form.append('file', fs.readFileSync(image_path), image_path);
        form.append('id', cloud_flare_image_custom_id);
        const {status, data} = await axios.post(
          'https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/images/v1',
          form,
          {
              headers: {
                  ...form.getHeaders(),
                  'Authorization': 'Bearer ' + process.env.CLOUDFLARE_API_KEY
              }
          }
        );
        if (status == 200) {
          console.log('Cached image ' + i + '.png');
        } else {
          console.log('Cannot cache image ' + i + '.png.');
        }
      } catch (e){
        
        console.log(e);
        if (e.response.status == 409) {
          console.log('Cached image ' + i + ' exit on CloudFlare!');
          send_telegram_message("The image exit on CloudFlare!" + cloud_flare_image_custom_id);
          console.log('Updated image ' + i + ' on CloudFlare!');
        } else {
          send_telegram_message("The image has error:" + cloud_flare_image_custom_id);
          console.log("Cache image has input " + i + " false: " + e.message);
        }
      }
    }
};

connectDb();
