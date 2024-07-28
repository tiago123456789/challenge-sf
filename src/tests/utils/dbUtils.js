

module.exports = (db) => {

    return {
        async deleteAll(table) {
            const items = await db.collection(table).listDocuments()
            await Promise.all(
                items.map((value) => {
                    return value.delete()
                })
            )
        },

        create(table, newRegister) {
            return db.collection(table).add(newRegister);
        }
    }

}