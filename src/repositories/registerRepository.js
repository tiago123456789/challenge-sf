
const TABLE = "registers";

class RegisterRepository {
    constructor(db) {
        this.db = db;
    }

    /**
      * @param {Object} newRegister
      * @param {string} newRegister.name
      * @param {Date} newRegister.createdAt
      * @return {Promise}
      */
    save(newRegister) {
        return this.db.collection(TABLE).add(newRegister);
    }

    /**
     *
     * @param {string} id
     * @param {Object} dataModified
     * @return {Promise}
     */
    update(id, dataModified) {
        return this.db.collection(TABLE).doc(id).update(dataModified);
    }

    /**
     * @param {Date} createdAt
     * @return {number}
     */
    async getTotal(createdAt) {
        const total = await this.db.collection(TABLE)
            .where("createdAt", "<=", createdAt)
            .count()
            .get();

        return total.data().count;
    }
}

module.exports = RegisterRepository;
