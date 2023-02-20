require("dotenv").config({ path: __dirname + "/.env" });
let mongoose = require('mongoose');
let database = require('./database.js');
let {send_telegram_message} = require("./utils.js");
let  { delay } = require("./utils.js");
const fs = require('fs');
var global_vars = {}
let axios = require('axios');
let FormData = require('form-data');

const push_to_cloudflare = async () =>{
  if (global_vars.is_push_to_cloudflare_status) return;
  global_vars.is_push_to_cloudflare_status = true;

  console.log('Checking for Image Queue ...');
  let images_not_on_cloudflare = await database.Images.find({isCloudFlare: false})

  let records_length = images_not_on_cloudflare.length;
  console.log('Image not pushed to cloudflare length:',records_length);
  for (var j=0;j<records_length;j++){
    try {
      console.log(images_not_on_cloudflare[j]);
      let originImage = images_not_on_cloudflare[j].locationOrigin;
      console.log('Starting push file: ' + originImage + 'to Cloudflare');
      let cloud_flare_image_custom_id = originImage.replace(/\.[^/.]+$/, "").split('/').pop();
      let location1440 = images_not_on_cloudflare[j].location1440;
      let location1920 = images_not_on_cloudflare[j].location1920;
      let location1024 = images_not_on_cloudflare[j].location1024;
      let location500 = images_not_on_cloudflare[j].location500;
      let location100 = images_not_on_cloudflare[j].location100;
      if (!fs.existsSync(originImage)) {
        console.log('File not exist on server, checking on CloudFlare');
        try {
          const {status} = await axios.get('https://api.cloudflare.com/client/v4/accounts/' + process.env.CLOUDFLARE_ACCOUNT_ID + '/images/v1/' + cloud_flare_image_custom_id, {
            headers: {
                'Authorization': 'Bearer ' + process.env.CLOUDFLARE_API_KEY,
                'Content-Type': 'application/json'
            }
          });
          if (status == 200) {
            console.log('File on CloudFlare');
            await database.Images.updateOne({input : images_not_on_cloudflare[j].input}, {
              isCloudFlare: true,
              location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
              location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
              location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
              location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
              location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
            });
            await delay(1000);
            if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
            if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
            if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
            if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
            if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
            if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
            send_telegram_message('Updated image ' + originImage + ' on CloudFlare!');
          }
        } catch (e) { 
          console.log('File not exist', e);
          continue;
        }
      } else {
        let form = new FormData();
        form.append('file', fs.readFileSync(originImage), originImage);
        form.append('id', cloud_flare_image_custom_id);
        console.log('Custom Id:', cloud_flare_image_custom_id);
        console.log('CLOUDFLARE_ACCOUNT_ID', process.env.CLOUDFLARE_ACCOUNT_ID);
        console.log('CLOUDFLARE_API_KEY', process.env.CLOUDFLARE_API_KEY);
        try {
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
            console.log({
              isCloudFlare: true,
              location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
              location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
              location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
              location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
              location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
            });
            await database.Images.updateOne({input : images_not_on_cloudflare[j].input}, {
              isCloudFlare: true,
              location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
              location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
              location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
              location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
              location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
            });
            await delay(1000);
            if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
            if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
            if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
            if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
            if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
            if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
            send_telegram_message('Cached image ' + originImage + ' on CloudFlare!');
          } else {
            send_telegram_message('Cannot cache image ' + originImage);
          }
        } catch (e) {
          if (e.response.status == 409) {
            console.log('Cached image ' + originImage + ' exist on CloudFlare!');
            await database.Images.updateOne({input : images_not_on_cloudflare[j].input}, {
              isCloudFlare: true,
              location1440: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1440',
              location1920: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1920',
              location1024: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/1024',
              location500: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/500',
              location100: 'https://imagedelivery.net/' + process.env.CLOUDFLARE_ACCOUNT_HASH + '/' + cloud_flare_image_custom_id + '/100',
            });
            await delay(1000);
            if (location1440 && fs.existsSync(location1440)) await fs.unlinkSync(location1440);
            if (location1920 && fs.existsSync(location1920)) await fs.unlinkSync(location1920);
            if (location1024 && fs.existsSync(location1024)) await fs.unlinkSync(location1024);
            if (location500 && fs.existsSync(location500)) await fs.unlinkSync(location500);
            if (location100 && fs.existsSync(location100)) await fs.unlinkSync(location100);
            if (fs.existsSync(originImage)) await fs.unlinkSync(originImage);
            send_telegram_message('Updated image ' + originImage + ' on CloudFlare!');
          } else {
            console.log(e.message);
            // continue;
            // send_telegram_message("Cache image has input " + originImage + " false: " + e.message);
          }
        }
      }
    } catch (e) {
      send_telegram_message("Cache image has input has error: " + e.message);
      console.log(e);
      continue;
    }
  }
  global_vars.is_push_to_cloudflare_status = false;
}

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
};
connectDb().then(async () => {
  console.log(`ARTZERO Push Images to CloudFlare Service is active!`);
  global_vars.is_push_to_cloudflare_status = false;
  setInterval(push_to_cloudflare, 5 * 1000);
});
