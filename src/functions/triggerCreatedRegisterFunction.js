const logger = require("firebase-functions/logger");

const RegisterRepository = require("../repositories/registerRepository");
const RegisterService = require("../services/registerService");

let db;

let registerRepository;
let registerService;

module.exports = (database) => {
    return async (event) => {
        const snapshot = event.data;
        if (!snapshot) {
            logger.info("No data associated with the event");
            return null;
        }

        if (!db) {
            db = database;
            registerRepository = new RegisterRepository(db);
            registerService = new RegisterService(
                registerRepository, logger,
            );
        }

        await registerService.setIncrementId(snapshot.id, snapshot.data().createdAt);
    };
};
