const logger = require("firebase-functions/logger");
const RegisterRepository = require("../repositories/registerRepository");
const RegisterService = require("../services/registerService");

let db;

let registerRepository;
let registerService;

module.exports = (database) => {
    return async (request, response) => {
        if (request.method !== "POST") {
            return response.status(405).json({
                message: "Http method not allowed",
            });
        }

        const data = request.body
        if (!data || !data.name) {
            return response.status(400).json({
                message: "The field name is required",
            });
        }

        if (!db) {
            db = database;
            registerRepository = new RegisterRepository(db);
            registerService = new RegisterService(
                registerRepository, logger,
            );
        }

        logger.info("Saving register");
        await registerService.save({
            name: data.name,
            createdAt: Date.now(),
        });
        logger.info("Saved register");
        return response.json({});
    }
}

