const {Mortgage, Employment, Income } = require('../model/morgage-model');

class MortgageRepository {
    //Create a new mortgage application
    static async createMortgage(data) {
        if (!data) {
            return {
                success: false,
                error: 'data cannot be undefined',
                status: 403
            };
        }

        try {
            // get referenced document data and save them
            const promisesEm = data.employment.map(async (e) => {
                const employment = new Employment(e);
                await employment.save();
                return employment;
            });

            const promisesIn = data.extraIncome.map(async (e) => {
                const income = new Income(e);
                await income.save();
                return income;
            });

            // collect their ids
            const employmentIds = (await Promise.all(promisesEm)).map(e => e._id);
            const extraIncomeIds = (await Promise.all(promisesIn)).map(e => e._id);

            // create mortgage using the ids
            const mortgage = new Mortgage({
                consentCreditCheck: data.consentCreditCheck,
                mortgage: data.mortgage,
                thirdPartyInfo: data.thirdPartyInfo,
                addressInfo: data.addressInfo,
                purchaseNumbers: data.purchaseNumbers,
                homePurchaseDetails: data.homePurchaseDetails,
                aboutProperty: data.aboutProperty,
                haveEquityCredit: data.haveEquityCredit,
                employment: employmentIds,
                extraIncome: extraIncomeIds,
            });

            // persist mortgage, and populate the referenced documents
            await mortgage.save();
            await mortgage.populate('employment');
            await mortgage.populate('extraIncome');

            // Update the referenced documents with the mortgage id
            await Promise.all(employmentIds.map(async (e) => {
                return await Employment.findByIdAndUpdate(e, {$set: { mortgageId: mortgage._id }});
            }));
            await Promise.all(extraIncomeIds.map(async (e) => {
                return await Income.findByIdAndUpdate(e, {$set: { mortgageId: mortgage._id }});
            }));

            return {
                success: true, mortgage, status: 201
            };
        } catch (error) {
            console.error('Error creating mortgage application', error);
            return {
                success: false, error: error.message, status: 500
            };
        }
    }

    //Retrieve all mortgage applications

    static async getAllMortgages() {
        try {
            const mortgages = await Mortgage.find().populate('employment').populate('extraIncome').exec();
            
            return {
                success: true, mortgages, status: 200
            };
        } catch (error) {
            console.error('Error retrieving all applications:', error);
            return {
                success: false, error: error.message, status: 500
            };
        }
    }

    //Retrieve a single mortgage app by id

    static async getMortgageById(id) {
        if (!id) {
            return {
                success: false,
                error: 'Id field is not defined', 
                status: 403
            }
        }

        try {
            const mortgage = await Mortgage.findById(id);
            if (!mortgage) {
                return {
                    success: false, error: 'Mortgage application not found', status: 404
                };
            }
            
            await mortgage.populate('employment');
            await mortgage.populate('extraIncome');
            return { 
                success: true, mortgage, status: 200
            };
        } catch (error) {
            console.error('Error retrieving mortgage application:', error);
            return {
                success: false, error: error.message, status: 500
            };
        }
    }

    //Update a mortgage app by id 
    static async updateMortgage(id, newData) {
        if (!id || !newData) {
            return {
                success: false,
                error: `Mortgage ${!id && !newData ? "id and new data fields" : id ? "id field" : "new data field"} are undefined`,
                status: 403
            }
        }

        try {
            // first get the document and check if it exists
            const mortgage = await Mortgage.findById(id);
            if (!mortgage) {
                return { 
                    success: false, error: 'Mortgage application not found', status: 404
                };
            }
            // use the new data to update the referenced documents first
            const newEmployment = mortgage.employment.map(async (e, index) => {
                return await Employment.findByIdAndUpdate(e.toString(), newData.employment[index], { returnDocument: 'after' });
            });


            const newIncome = mortgage.extraIncome.map(async (e, index) => {
                await Income.findByIdAndUpdate(e.toString(), newData.extraIncome[index], { returnDocument: 'after' });
            });

            await Promise.all(newEmployment);
            await Promise.all(newIncome);

            // update the mortgage
            const newMortgage = await Mortgage.findByIdAndUpdate(id, {
                    consentCreditCheck: newData.consentCreditCheck,
                    mortgage: newData.mortgage,
                    thirdPartyInfo: newData.thirdPartyInfo,
                    addressInfo: newData.addressInfo,
                    purchaseNumbers: newData.purchaseNumbers,
                    homePurchaseDetails: newData.homePurchaseDetails,
                    aboutProperty: newData.aboutProperty,
                    haveEquityCredit: newData.haveEquityCredit,
            }, { returnDocument: 'after' });


            await newMortgage.populate('employment');
            await newMortgage.populate('extraIncome');
            return { 
                success:true, mortgage: newMortgage, status: 200
            };
        } catch (error) {
            console.error('Error updating mortgage application: ', error);
            return {
                success: false, error: error.message, status: 500
            };
        }
    }

    //Delete a mortgage app by id 

    static async deleteMortgage(id) {
        if (!id) {
            return {
                success: false,
                error: 'Id field is undefined',
                status: 403
            }
        }

        try {
            const mortgage = await Mortgage.findByIdAndDelete(id);
            if (!mortgage) {
                return {
                    success: false, error: 'mortgage not found', status: 404
                };
            }
        } catch (error) {
            console.error('Error deleting mortgage application: ', error);
            return {
                success: false, error: error.message, status: 500
            };
        }

        return { success: true, status: 204 };
    }
}

module.exports = MortgageRepository;