const {onRequest} = require("firebase-functions/v2/https");
const {
    onDocumentCreated,
} = require("firebase-functions/v2/firestore");

const createRegisterFunction = require("./functions/createRegisterFunction");
const triggerCreatedRegisterFunction = require("./functions/triggerCreatedRegisterFunction");

const {db} = require("./configs/firebase");

exports.createRegister = onRequest({cors: true}, createRegisterFunction(db));
exports.triggerCreatedRegister = onDocumentCreated(
    "registers/{registerId}",
    triggerCreatedRegisterFunction(db),
);
