const admin = require('firebase-admin');
const fs = require('fs');

let serviceAccount = null;
if (process.env.NODE_ENV === 'development' && fs.existsSync('./firestore-cred.json')) {
  serviceAccount = require('./firestore-cred.json');
} else {
  serviceAccount = {
    "type": process.env.FS_type,
    "project_id": process.env.FS_project_id,
    "private_key_id": process.env.FS_private_eky_id,
    "private_key": process.env.FS_private_key,
    "client_email": process.env.FS_client_email,
    "client_id": process.env.FS_client_id,
    "auth_uri": process.env.FS_auth_uri,
    "token_uri": process.env.FS_token_uri,
    "auth_provider_x509_cert_url": process.env.FS_auth_provider_url,
    "client_x509_cert_url": process.env.FS_client_url
  }

}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

module.exports = firestore;
