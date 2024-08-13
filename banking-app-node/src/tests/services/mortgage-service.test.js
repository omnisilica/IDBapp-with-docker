const MortgageService = require('../../main/services/mortgage-service');
const MortgageRepository = require('../../main/repository/mortgage-repository');
const oneMortgage = require('../data/mockData');
oneMortgage['_id'] ="662810609c44c1194c225857";

// We need to mock the static functions since we are using ES6 classes
// Global mocks
const mockGetAllMortgages = jest.spyOn(MortgageRepository, 'getAllMortgages');
const mockGetMortgageById = jest.spyOn(MortgageRepository, 'getMortgageById');
const mockCreateMortgage = jest.spyOn(MortgageRepository, 'createMortgage');
const mockDeleteMortgage = jest.spyOn(MortgageRepository, 'deleteMortgage');
const mockUpdateMortgage = jest.spyOn(MortgageRepository, 'updateMortgage');

describe("MortgageService CRUD operations test", () => {
    describe("Getting all Mortgages", () => {
        test("Should call repository method to get all mortgage", async () => {
            mockGetAllMortgages.mockImplementationOnce(() => ({
                success: true,
                mortgages: []
            }));

            const result =  await MortgageService.getAllMortgages();
            expect(mockGetAllMortgages).toHaveBeenCalledTimes(1);
        });

        test("Should return an empty array if there are no mortgages", async () => {
            mockGetAllMortgages.mockImplementationOnce(() => ({
                success: true,
                mortgages: []
            }));
            const result =  await MortgageService.getAllMortgages();
            
            expect(result.success).toBe(true);
            expect(result.mortgages.length).toBe(0);
            expect(result.mortgages).toStrictEqual([]);
        });

        test("Should return an array with one mortgage if there is only one in the database", async () => {
            mockGetAllMortgages.mockImplementationOnce(() => ({
                success: true,
                mortgages: [oneMortgage]
            }));
            const result = await MortgageService.getAllMortgages();

            expect(result.success).toBe(true);
            expect(result.mortgages.length).toBe(1);
            expect(result.mortgages).toStrictEqual([oneMortgage]);
        });
    });

    describe("Getting a mortgage by ID", () => {
        test("Should call Repository method with the ID to get a Mortgage", async () => {
            mockGetMortgageById.mockImplementationOnce(() => ({
                success: true,
                mortgage: oneMortgage
            }));
            const result = await MortgageService.getMortgageById("662810609c44c1194c225857");

            expect(mockGetMortgageById).toHaveBeenCalledWith("662810609c44c1194c225857");
            expect(mockGetMortgageById).toHaveBeenCalledTimes(1);
        });

        test("Should get one Mortgage", async () => {
            mockGetMortgageById.mockImplementationOnce(() => ({
                success: true,
                mortgage: oneMortgage
            }));
            const result = await MortgageService.getMortgageById("662810609c44c1194c225857");
            expect(result.success).toBe(true);
            expect(result.mortgage).toBe(oneMortgage);
        });        

        test("Should indicate if Mortgage does not exist if a Mortgage with the given ID is not found", async () => {
            mockGetMortgageById.mockImplementationOnce(() => ({
                success: false, 
                error: 'Mortgage application not found'
            }));
            const result = await MortgageService.getMortgageById("123456789ABCD");

            expect(mockGetMortgageById).toHaveBeenCalledWith("123456789ABCD");
            expect(mockGetMortgageById).toHaveBeenCalledTimes(1);
            expect(result.success).toBe(false);
            expect(result.mortgage).not.toBeDefined();
            expect(result.error).toBeDefined();
        });
    });

    describe("Creating a Mortgage", () => {
        test("Should properly handle the case when createMortgage is used with an empty data field", async () => {
            const result = await MortgageService.createMortgage();
            expect(result.success).toBe(false);
            expect(result.mortgage).not.toBeDefined();
            expect(result.error).toBeDefined();
        });

        test("Should call respository method to create a new mortgage", async () => {
            mockCreateMortgage.mockImplementationOnce(() => ({
                success: true,
                mortgage: oneMortgage
            }));

            const result = await MortgageService.createMortgage(oneMortgage);
            expect(mockCreateMortgage).toHaveBeenCalledTimes(1);
            expect(mockCreateMortgage).toHaveBeenCalledWith(oneMortgage);
        });

        test("Should return the newly created mortgage", async () => {
            mockCreateMortgage.mockImplementationOnce(() => ({
                success: true,
                mortgage: oneMortgage
            }));

            const result = await MortgageService.createMortgage(oneMortgage);
            expect(result.success).toBe(true);
            expect(result.mortgage).toBeDefined();
            expect(result.mortgage._id).toBe(oneMortgage._id);
            expect(result.mortgage).toBe(oneMortgage);
        });
    });

    describe("Updating a Mortgage", () => {
        const newMortgage = structuredClone(oneMortgage);
        newMortgage.thirdPartyInfo.firstName = "Paul Atredeis";

        test("Should handle id, and data inputs if they are undefined", async () => {
            const result = await MortgageService.updateMortgage();

            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
            expect(result.mortgage).not.toBeDefined();
        });

        test("Should return the update mortgage", async () => {

            mockUpdateMortgage.mockImplementationOnce(() => ({
                success: true,
                mortgage: newMortgage,
            }));

            const result = await MortgageService.updateMortgage(oneMortgage._id, newMortgage);
            expect(result.success).toBe(true);
            expect(result.mortgage._id).toBe(oneMortgage._id);
            expect(result.mortgage).toBe(newMortgage);
        });

        test("Should not find the Mortgage if the given ID does not match a Mortgage on record", async () => {
            mockUpdateMortgage.mockImplementationOnce(() => ({
                success: false,
                error: "some error message",
            }));

            const result = await MortgageService.updateMortgage("123456789ABCD", newMortgage);
            expect(mockUpdateMortgage).toHaveBeenCalledWith("123456789ABCD", newMortgage);
            expect(result.success).toBe(false);
            expect(result.error).toBeDefined();
            expect(result.mortgage).not.toBeDefined();
        });

        test("Should use repository method to update mortgage", async () => {
            mockUpdateMortgage.mockImplementationOnce(() => ({
                success: true,
                mortgage: newMortgage,
            }));

            const result = await MortgageService.updateMortgage(oneMortgage._id, newMortgage);

            expect(mockUpdateMortgage).toHaveBeenCalledTimes(1);
            expect(mockUpdateMortgage).toHaveBeenCalledWith(oneMortgage._id, newMortgage);
        });
    });

    describe("Deleting a Mortgage", () => {
        test("Should delete a Mortgage", async () => {
            mockDeleteMortgage.mockImplementationOnce(() => ({
                success: true
            }));

            const result = await MortgageService.deleteMortgage(oneMortgage._id);

            expect(result.success).toBe(true);
        });

        test("should use the repository method to delete a mortgage", async () => {
            mockDeleteMortgage.mockImplementationOnce(() => ({
                success: true
            }));

            const result = await MortgageService.deleteMortgage(oneMortgage._id);

            expect(mockDeleteMortgage).toHaveBeenCalledTimes(1);
            expect(mockDeleteMortgage).toHaveBeenCalledWith(oneMortgage._id);
        });

        test("Should return an error and unsuccessful operation when given no id", async () => {
            const result = await MortgageService.deleteMortgage();

            expect(result.success).toBe(false);
            expect(result.mortgage).not.toBeDefined();
            expect(result.error).toBeDefined();
        });
    });
});