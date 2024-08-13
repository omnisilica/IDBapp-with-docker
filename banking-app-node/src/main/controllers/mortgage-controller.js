const MortgageService = require("../services/mortgage-service"); // use service class to handle controller logic
const express = require('express');

async function createMortgage(req, res) {
    try {
        const mortgageData = req.body;
        const result = await MortgageService.createMortgage(mortgageData);
        res.status(result.status);
        res.json(result);
    } catch (error) {
        console.error('Error creating mortgage application', error);
        res.status(500);
        res.json({ success: false, error: error.message });
    }
}

async function getAllMortgages(req, res) {
    try {
        const result = await MortgageService.getAllMortgages();
        res.status(200);
        res.json(result);
    } catch (error) {
        console.error('Error retrieving all applications:', error);
        res.status(500);
        res.json({ success: false, error: error.message });
    }
}

async function getMortgageById(req, res) {
    try {
        const id = req.params.id;
        const result = await MortgageService.getMortgageById(id);
        res.status(result.status);
        res.json(result);
    } catch (error) {
        console.error('Error retrieving mortgage application:', error);
        res.status(500);
        res.json({ success: false, error: error.message });
    }
}

async function updateMortgage(req, res) {
    try {
        const id = req.params.id;
        const newData = req.body;
        const result = await MortgageService.updateMortgage(id, newData);
        res.status(result.status);
        res.json(result);
    } catch (error) {
        console.error('Error updating mortgage application: ', error);
        res.status(500);
        res.json({ success: false, error: error.message });
    }
}

async function deleteMortgage(req, res) {
    try {
        const id = req.params.id;
        const result = await MortgageService.deleteMortgage(id);
        res.status(result.status);
        res.json(result);
    } catch (error) {
        console.error('Error deleting mortgage application: ', error);
        res.status(500);
        res.json({ success: false, error: error.message });
    }
}

const mortgageRouter = express.Router();

mortgageRouter.get('/', getAllMortgages);
mortgageRouter.get('/:id', getMortgageById);
mortgageRouter.post('/', createMortgage);
mortgageRouter.put('/:id', updateMortgage);
mortgageRouter.delete('/:id', deleteMortgage);

module.exports = {
    mortgageRouter, 
    controller: {
        createMortgage, 
        getAllMortgages, 
        getMortgageById, 
        updateMortgage, 
        deleteMortgage 
    }
};
