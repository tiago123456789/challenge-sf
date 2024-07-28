
class RegisterService {
    /**
     * @param {*} repositoryRepository
     * @param {*} logger
     */
    constructor(
        repositoryRepository,
        logger,
    ) {
        this.repositoryRepository = repositoryRepository;
        this.logger = logger;
    }

    /**
     * @param {Object} newRegister
     * @param {string} newRegister.name
     * @param {Date} newRegister.createdAt
     * @return {Promise}
     */
    save(newRegister) {
        return this.repositoryRepository.save(newRegister);
    }

    /**
     * @param {string} id
     * @param {Date} dateOfLastRegisterCreated
     */
    async setIncrementId(id, dateOfLastRegisterCreated) {
        this.logger.info(`Updating document with id ${id}`);
        this.logger.info(`Getting total de registers`);
        const total = await this.repositoryRepository.getTotal(dateOfLastRegisterCreated);

        this.logger.info(
            `Found total of ${total} registers`,
        );
        this.logger.info(
            `Set value ${total} on column increment_id of document with id ${id}`,
        );
        await this.repositoryRepository.update(id, {
            increment_id: total,
        });
        this.logger.info(
            `Setted value ${total} on column increment_id of document with id ${id}`,
        );
    }
}

module.exports = RegisterService;
