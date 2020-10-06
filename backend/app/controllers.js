const { google_client_id, google_client_secret } = require('../config/config');

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const credential_file = require('../config/client_secret.json');

const client_id = credential_file.web.client_id;
const client_secret = credential_file.web.client_secret;
const redirect_uri = "http://localhost:3000/upload"

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

// const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file'];
// const TOKEN_PATH = 'token.json';

exports.getAutherizationURI = (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    return res.status(200).send(authUrl);
};

exports.getAutherizationToken = (req, res) => {
    const AuthCode = req.body.AuthCode;

    console.log(AuthCode);

    oAuth2Client.getToken(AuthCode, (err, token) => {
        if(err) {
            // console.error('Error retrieving access token', err);
            console.error('Error retrieving access token' + err);
            return res.status(500).send(err); 
        }
        else{
            return res.status(200).send(token); 
        }
    });
};

exports.getUserInfo = (req, res) => {
    const Authtoken = req.body.Authtoken;
    // const Authtoken = "{\"access_token\":\"ya29.a0AfH6SMA3VhnsUMODHHX_hgBCYly7IfspJpuK5cqrp_EsTEApNiXFJ5agvXByLKHwMpSKiXiYfy6tAXqDvU1tqch5zg_9ggCxa_TvjrWXIzWn61_WRk7Hg1SC6cRmkGenLjuy304cladc1srmBalwmxm1adnGpVLZNO4\",\"refresh_token\":\"1//0goLOLLgIaTKUCgYIARAAGBASNwF-L9Irxa_uLLAWpV32LZ7pOIIzyTuQETKbIoUHka_SogxGAYQJrn4d6delG2oyG7rr5BNVtg8\",\"scope\":\"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly\",\"token_type\":\"Bearer\",\"id_token\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlZmZhNzZlZjMzZWNiNWUzNDZiZDUxMmQ3ZDg5YjMwZTQ3ZDhlOTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNTEzOTQ5ODk5NC00MGpvZTB2OTdiM3Zka3V2MjRubjYxbWdrN2Z2Nm9xci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjE1MTM5NDk4OTk0LTQwam9lMHY5N2IzdmRrdXYyNG5uNjFtZ2s3ZnY2b3FyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwMzY4Njg5MjUyODAyMTcyNTIzIiwiYXRfaGFzaCI6IkRMNHRXM2NYU0JUcVFvcERTZ29wVnciLCJuYW1lIjoicHJvIGplY3QiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy0wb3A5RUlBcHZNTS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNuMGN4c1BQSkNkOVRuVUtOeXVXZndoREJ0YmhnL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJwcm8iLCJmYW1pbHlfbmFtZSI6ImplY3QiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYwMTc1NTMyMCwiZXhwIjoxNjAxNzU4OTIwfQ.KNXlTYXeYruoakN08pg2_JcwzImncpW4MCra8u7gb1l9VC16lLXhcMZlwVxsIre03TNY9zpbYj386S0bOuRGj6d1v8FaTpk5rV7ndArTD7DNmGwcminqMwLoYUmLa5lqOB89DHb0uC1mZCjL-kEjr9bQ9kx9M6IYuqGkV53zoGp2Vxu1IVKbbkAxLblgXSmlcATQLe3FjKhqUxBIJ4bONJgpDMTznKaRXTBv_dELfHIXlg6exLbY-NlL8VcHH_uaeMozUTu9GQKQrm8QzBvSY0nd4D7U_etl80CPPBeWXKY6cCR7wftnkW78vfrxaAy0SjrBWnlySqPJJRzpzIZmJw\",\"expiry_date\":1601758919272}";
    oAuth2Client.setCredentials(Authtoken);
    const OAuth2 = google.oauth2({version:'v2',auth:oAuth2Client});

    OAuth2.userinfo.get(Authtoken, (err, data) => {
        if(err) {
            console.error('Error retrieving user data', err);
            return res.status(400); 
        }
        else{
            return res.status(200).send(data.data); 
        }
    });
};


// http://localhost:3000/?code=4/4wGAPOGk1iLk4f1zI1UiixEWFFX-YsrGRWa5wTlBQN2nTCVWzscMeE4PakriFJ-N26EUfIfifeVnQUK5INKpWl0&scope=https://www.googleapis.com/auth/drive.metadata.readonly

// Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//     if (err) return console.log('Error loading client secret file:', err);
//     // Authorize a client with credentials, then call the Google Drive API.
//     authorize(JSON.parse(content), listFiles);
// });

// /**
//  * Create an OAuth2 client with the given credentials, and then execute the
//  * given callback function.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorize(credentials, callback) {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(
//         client_id, client_secret, redirect_uris[0]);

//     // Check if we have previously stored a token.
//     fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) return getAccessToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//     });
// }

// /**
//  * Get and store new token after prompting for user authorization, and then
//  * execute the given callback with the authorized OAuth2 client.
//  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
//  * @param {getEventsCallback} callback The callback for the authorized client.
//  */
// function getAccessToken(oAuth2Client, callback) {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES,
//     });
//     console.log('Authorize this app by visiting this url:', authUrl);
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     rl.question('Enter the code from that page here: ', (code) => {
//         rl.close();
//         oAuth2Client.getToken(code, (err, token) => {
//             if (err) return console.error('Error retrieving access token', err);
//             oAuth2Client.setCredentials(token);
//             // Store the token to disk for later program executions
//             fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//                 if (err) return console.error(err);
//                 console.log('Token stored to', TOKEN_PATH);
//             });
//             callback(oAuth2Client);
//         });
//     });
// }

// /**
//  * Lists the names and IDs of up to 10 files.
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listFiles(auth) {
//     const drive = google.drive({ version: 'v3', auth });
//     drive.files.list({
//         pageSize: 10,
//         fields: 'nextPageToken, files(id, name)',
//     }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const files = res.data.files;
//         if (files.length) {
//             console.log('Files:');
//             files.map((file) => {
//                 console.log(`${file.name} (${file.id})`);
//             });
//         } else {
//             console.log('No files found.');
//         }
//     });
// }
