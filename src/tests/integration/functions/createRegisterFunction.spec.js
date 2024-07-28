const createRegister = require("../../../functions/createRegisterFunction");
const { db } = require("../../../configs/firebase");
const dbUtils = require("../../utils/dbUtils")(db);

describe("CreateRegisterFunction", () => {

    beforeEach(async () => {
        await dbUtils.deleteAll("registers")
    })

    it(
        "Should be throw exception when try make request using http verb different POST",
        async () => {

            const request = {
                method: "GET",
                headers: {
                    origin: ""
                }
            };

            const response = {
                status: () => {
                    return {
                        json: (data) => data
                    }
                },
            }

            const result = await createRegister(db)(request, response)
            expect(result).toEqual({ message: 'Http method not allowed' })
        })

    it(
        "Should be throw exception when try make request, but not informed name in request",
        async () => {

            const request = {
                method: "POST",
                headers: {
                    origin: ""
                },
                body: {
                }
            };

            const jsonMethod = (data) => data
            const response = {
                status: () => {
                    return {
                        json: jsonMethod
                    }
                },
                json: jsonMethod
            }

            const result = await createRegister(db)(request, response)
            expect(result).toEqual({
                message: "The field name is required",
            })
        })


    it(
        "Should be create with succes",
        async () => {

            const request = {
                method: "POST",
                headers: {
                    origin: ""
                },
                body: {
                    name: "abc"
                }
            };

            const jsonMethod = (data) => data
            const response = {
                status: () => {
                    return {
                        json: jsonMethod
                    }
                },
                json: jsonMethod
            }

            await createRegister(db)(request, response)
            const data = await db.collection('registers')
                .limit(1)
                .get();

            const registers = data.docs.map(item => item.data())
            expect(registers.length).toBe(1)
            expect(registers[0].name).toBe("abc")
        })
});
