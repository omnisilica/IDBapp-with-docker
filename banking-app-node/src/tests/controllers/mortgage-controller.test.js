const { controller } = require('../../main/controllers/mortgage-controller');
const MortgageService = require('../../main/services/mortgage-service');
const oneMortgage = require('../data/mockData');

oneMortgage['_id'] = "662810609c44c1194c225857";
const updatedMortgage = structuredClone(oneMortgage);
updatedMortgage.thirdPartyInfo.firstName = "Paul Atredeis";

describe("Controller Unit tests", () => {
    // mocks
    const mockCreateMortgage = jest.spyOn(MortgageService, 'createMortgage')
                                .mockImplementation(() => ({
                                        success: true,
                                        mortgage: oneMortgage,
                                }));
    const mockGetAllMortgages = jest.spyOn(MortgageService, 'getAllMortgages')
                                    .mockImplementation(() => ({
                                        success: true,
                                        mortgage: [oneMortgage],
                                }));
    const mockGetMortgageById = jest.spyOn(MortgageService, 'getMortgageById')
                                    .mockImplementation(() => ({
                                        success: true,
                                        mortgage: oneMortgage,
                                }));
    const mockUpdateMortgage = jest.spyOn(MortgageService, 'updateMortgage')
                                .mockImplementation(() => ({
                                        success: true,
                                        mortgage: updatedMortgage,
                                        status: 201
                                }));
    const mockDeleteMortgage = jest.spyOn(MortgageService, 'deleteMortgage')
                                .mockImplementation(() => ({
                                        success: true,
                                        status: 204
                                }));
    // stubs
    const req = {
        body: oneMortgage,
        params: {
            id: oneMortgage._id
        }
    }

    const res = {
        status: jest.fn((x) => x),
        json: jest.fn((x) => x)
    }
    describe("Get all Mortgages tests", () => {
        test("Controller should use service layer method", async () => {
            const result = await controller.getAllMortgages(req, res);
            expect(mockGetAllMortgages).toHaveBeenCalledTimes(1);
        });
    });

    describe("Get Mortgage by Id test", () => {
        test("Controller uses service layer function", async () => {
            const result = await controller.getMortgageById(req, res);
            expect(mockGetMortgageById).toHaveBeenCalledTimes(1);
            expect(mockGetMortgageById).toHaveBeenCalledWith(oneMortgage._id);
        });
    });

    describe("Create Mortgage tests", () => {
        test("Controller uses serivce layer function", async () => {
            const result = await controller.createMortgage(req, res);
            expect(mockCreateMortgage).toHaveBeenCalledTimes(1);
            expect(mockCreateMortgage).toHaveBeenCalledWith(oneMortgage);
        });
    });

    describe("Update Mortgage tests", () => {
        test("Controller uses service layer function", async () => {
            const result = await controller.updateMortgage(req, res);
            expect(mockUpdateMortgage).toHaveBeenCalledTimes(1);
            expect(mockUpdateMortgage).toHaveBeenCalledWith(oneMortgage._id, oneMortgage);
        });
    });

    describe("Delete mortgage tests", () => {
        test("controller uses service layer function", async () => {
            const result = await controller.deleteMortgage(req, res);
            expect(mockDeleteMortgage).toHaveBeenCalledTimes(1);
            expect(mockDeleteMortgage).toHaveBeenCalledWith(oneMortgage._id);
        });
    });
});


