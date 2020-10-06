const dotenv = require('dotenv');

//calling environment variables
const result = dotenv.config({path: __dirname + '/.env'});
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;
// console.log(envs);

//export environment variables
module.exports = {
  google_client_id: process.env.GOOGLE_DRIVE_API_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_DRIVE_API_CLIENT_SECRET,
  port: process.env.PORT
};