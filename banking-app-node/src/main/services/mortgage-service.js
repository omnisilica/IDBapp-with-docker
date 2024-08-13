const MortgageRepository = require('../repository/mortgage-repository');

class MortgageService {
    // Create a new mortgage application
    static async createMortgage(data) {
        try {
            const result = await MortgageRepository.createMortgage(data);
            return result;
        } catch (error) {
            console.error('Error creating mortgage application', error);
            throw new Error('Error creating mortgage application');
        }
    }

    // Retrieve all mortgage applications
    static async getAllMortgages() {
        try {
            const result = await MortgageRepository.getAllMortgages();
            return result;
        } catch (error) {
            console.error('Error retrieving all applications:', error);
            throw new Error('Error retrieving all mortgage applications');
        }
    }

    // Retrieve a single mortgage app by id
    static async getMortgageById(id) {
        try {
            const result = await MortgageRepository.getMortgageById(id);
            return result;
        } catch (error) {
            console.error('Error retrieving mortgage application:', error);
            throw new Error('Error retrieving mortgage application');
        }
    }

    // Update a mortgage app by id
    static async updateMortgage(id, newData) {
        try {
            const result = await MortgageRepository.updateMortgage(id, newData);
            return result;
        } catch (error) {
            console.error('Error updating mortgage application: ', error);
            throw new Error('Error updating mortgage application');
        }
    }

    // Delete a mortgage app by id
    static async deleteMortgage(id) {
        try {
            const result = await MortgageRepository.deleteMortgage(id);
            return result;
        } catch (error) {
            console.error('Error deleting mortgage application: ', error);
            throw new Error('Error deleting mortgage application');
        }
    }
}

module.exports = MortgageService;
