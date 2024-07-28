const triggerCreatedRegister = require("../../../functions/triggerCreatedRegisterFunction");
const {db} = require("../../../configs/firebase");
const dbUtils = require("../../utils/dbUtils")(db);

const TABLE = "registers";

describe("triggerCreatedRegisterFunction.spec", () => {
    beforeEach(async () => {
        await dbUtils.deleteAll("registers");
    });

    it(
        "Should be not increment id because don't have register",
        async () => {
            const result = await triggerCreatedRegister(db)({
                data: null,
            });
            expect(result).toBe(null);
        });

    it(
        "Should be set column increment_id for register",
        async () => {
            const newRegister = {
                name: "abc",
                createdAt: Date.now(),
            };
            const register = await dbUtils.create(TABLE, newRegister);
            await triggerCreatedRegister(db)({
                data: {
                    id: register.id,
                    data() {
                        return newRegister;
                    },
                },
            });

            const data = await db.collection(TABLE)
                .doc(register.id)
                .get();

            const registerCreated = data.data();
            expect(newRegister.name).toBe(registerCreated.name);
            expect(newRegister.createdAt).toBe(registerCreated.createdAt);
            expect(1).toBe(registerCreated.increment_id);
        });


    it(
        "Should be set column increment_id equal 2 for register",
        async () => {
            const newRegister = {
                name: "abc",
                createdAt: Date.now(),
            };
            const register = await dbUtils.create(TABLE, newRegister);
            await triggerCreatedRegister(db)({
                data: {
                    id: register.id,
                    data() {
                        return newRegister;
                    },
                },
            });

            const data = await db.collection(TABLE)
                .doc(register.id)
                .get();

            const registerCreated = data.data();
            expect(newRegister.name).toBe(registerCreated.name);
            expect(newRegister.createdAt).toBe(registerCreated.createdAt);
            expect(1).toBe(registerCreated.increment_id);

            const register2 = await dbUtils.create(TABLE, newRegister);
            await triggerCreatedRegister(db)({
                data: {
                    id: register2.id,
                    data() {
                        return newRegister;
                    },
                },
            });

            const data2 = await db.collection(TABLE)
                .doc(register2.id)
                .get();

            const registerCreated2 = data2.data();
            expect(newRegister.name).toBe(registerCreated2.name);
            expect(newRegister.createdAt).toBe(registerCreated2.createdAt);
            expect(2).toBe(registerCreated2.increment_id);
        });
});
