const admin = require("firebase-admin");

let serviceAccount = require("../credential.json");
if (process.env.NODE_ENV == "test") {
    serviceAccount = require("../credential-test.json");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = {
    db
}

