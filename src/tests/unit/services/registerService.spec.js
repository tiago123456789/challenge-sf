const RegisterService = require("../../../services/registerService");


describe("RegisterService", () => {
    let registerRepository;
    let logger;

    beforeEach(() => {
        registerRepository = {
            save: jest.fn(),
            update: jest.fn(),
            getTotal: jest.fn(),
        };

        logger = {
            info: jest.fn(),
        };
    });

    it("Should be save register with success", async () => {
        const registerService = new RegisterService(
            registerRepository,
            logger,
        );

        await registerService.save({
            name: "Test",
            createdAt: new Date(),
        });

        expect(registerRepository.save).toHaveBeenCalledTimes(1);
    });

    it("Should be set increment_id for register with success", async () => {
        registerRepository.getTotal.mockResolvedValue(10);

        const registerService = new RegisterService(
            registerRepository,
            logger,
        );

        const id = "lU56rdRwifi6i1de7axf";
        const dateOfLastRegisterCreated = Date.now();
        await registerService.setIncrementId(
            id, dateOfLastRegisterCreated,
        );

        expect(registerRepository.update).toHaveBeenCalledTimes(1);
        expect(registerRepository.update).toHaveBeenCalledWith(id, {
            increment_id: 10,
        });
        expect(registerRepository.getTotal).toHaveBeenCalledTimes(1);
        expect(registerRepository.getTotal).toHaveBeenCalledWith(dateOfLastRegisterCreated);
        expect(logger.info).toHaveBeenCalledTimes(5);
    });
});
