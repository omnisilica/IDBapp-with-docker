
const MortgageRepository = require('../../main/repository/mortgage-repository');
const Mortgage = require('../../main/model/morgage-model');

// Import the mock data
const mockMortgageData = require('../data/mockData');

// Mocking the methods of MortgageRepository
jest.mock('../../main/repository/mortgage-repository');

// Test suite for the Mortgage-Repository class
describe('MortgageRepository', () => {
    // Test to create a new mortgage application
    test('createMortgage', async () => {
        // Use the mock data for testing
        MortgageRepository.createMortgage.mockResolvedValueOnce({
            success: true,
            mortgage: mockMortgageData
        });
        const result = await MortgageRepository.createMortgage(mockMortgageData);
        expect(result.success).toBe(true);
        expect(result.mortgage).toBe(mockMortgageData);
    });

    // Test to get all mortgage applications
    test('getAllMortgages', async () => {
        // Mocking the return value of getAllMortgages method
        const mockMortgages = [mockMortgageData];
        MortgageRepository.getAllMortgages.mockResolvedValueOnce({
            success: true,
            mortgages: mockMortgages
        });
        const result = await MortgageRepository.getAllMortgages();
        expect(result.success).toBe(true);
        expect(result.mortgages).toEqual(expect.any(Array));
        expect(result.mortgages[0]).toBe(mockMortgageData);
    });

    // Test to get a single mortgage application by ID
    test('getMortgageById', async () => {
        const mockId = 'mock_id';
        MortgageRepository.getMortgageById.mockResolvedValueOnce({
            success: true,
            mortgage: mockMortgageData
        });
        const result = await MortgageRepository.getMortgageById(mockId);
        expect(result.success).toBe(true);
        expect(result.mortgage).toBe(mockMortgageData);
    });

    // Test to update a mortgage application
    test('updateMortgage', async () => {
        const mockId = 'mock_id';
        MortgageRepository.updateMortgage.mockResolvedValueOnce({
            success: true,
            mortgage: mockMortgageData
        });
        const result = await MortgageRepository.updateMortgage(mockId, mockMortgageData);
        expect(result.success).toBe(true);
        expect(result.mortgage).toBe(mockMortgageData);
    });

    // Test to delete a mortgage application
    test('deleteMortgage', async () => {
        const mockId = 'mock_id';
        MortgageRepository.deleteMortgage.mockResolvedValueOnce({
            success: true
        });
        const result = await MortgageRepository.deleteMortgage(mockId);
        expect(result.success).toBe(true);
    });
});
