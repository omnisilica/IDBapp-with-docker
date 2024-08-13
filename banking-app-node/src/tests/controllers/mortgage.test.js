const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const { Mortgage } = require('../../main/model/morgage-model');
const oneMortgage = require('../data/mockData');
const MortgageRepository = require('../../main/repository/mortgage-repository');
const express = require('express');
const audit = require('express-requests-logger');
const { mortgageRouter } = require('../../main/controllers/mortgage-controller');

const app = express();
// Audit request and response
app.use(audit({
    excludeURLs: ['health', 'metrics'], // Exclude paths which enclude 'health' & 'metrics'
    request: {
        maskBody: ['password'], // Mask 'password' field in incoming requests
        excludeHeaders: ['authorization'], // Exclude 'authorization' header from requests
        excludeBody: ['creditCard'], // Exclude 'creditCard' field from requests body
        maskHeaders: ['header1'], // Mask 'header1' header in incoming requests
        maxBodyLength: 50 // limit length to 50 chars + '...'
    },
    response: {
        maskBody: ['session_token'], // Mask 'session_token' field in response body
        excludeHeaders: ['*'], // Exclude all headers from responses,
        excludeBody: ['*'], // Exclude all body from responses
        maskHeaders: ['header1'], // Mask 'header1' header in incoming requests
        maxBodyLength: 50 // limit length to 50 chars + '...'
    }
}));
// Middleware to parse JSON body
app.use(express.json());
// Route definitions
app.use('/mortgages', mortgageRouter);

//testing http end points onthis controller/router
describe("Controller super tests", () => {
    // set up in memory database
    let mongod = undefined;
    beforeAll(async () => {

        mongod = await MongoMemoryServer.create({
            instance: {
                port: 27018,
                ip: '127.0.0.1',
                dbName: 'test'
            }
        });
        let uri = await mongod.getUri();
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 1000,
        });
    });
    describe("GET /mortgages", () => {
        // get all mortgages
        test("it should give an empty array with proper status codes", async () => {
            const result = await request(app).get('/mortgages');
            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('mortgages');
            expect(result.body.mortgages.length).toBe(0);
            expect(result.body.mortgages).toStrictEqual([]);
        });
    });
    describe("POST /mortgages", () => {
        // create mortgage
        test("POST /mortgages, it should return the newly created mortgage with a status code 201", async() => {
            const result = await request(app).post('/mortgages').send(oneMortgage);
            expect(result.statusCode).toBe(201);
            expect(result.body).toHaveProperty('mortgage');

            const id = result.body.mortgage._id;
            const mortgageOnDb = await Mortgage.findById(id);
            expect(mortgageOnDb).not.toBeNull();
        });
    });

    // get a single mortgage
    describe("GET /mortgages/:id", () => {
        const someOtherId = "0123456789abcdef01234567";
        let id = undefined;

        beforeAll(async () => {
            const mortgageQuery = await Mortgage.find();
            id = mortgageQuery[0]._id.toString();
        });
        
        test("should get the mortgage with this id, with proper status codes", async () => {
            const result = await request(app).get(`/mortgages/${id}`);
            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('mortgage');
            expect(result.body.mortgage._id).toStrictEqual(id);
        });

        test("should give a status code of 404 if the mortgage does not exist", async () => {
            const result = await request(app).get(`/mortgages/${someOtherId}`);
            expect(result.statusCode).toBe(404);
        });

        test("GET /mortgages should now have an array with a single mortgage in it", async () => {
            const result = await request(app).get('/mortgages');
            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('mortgages');
            expect(result.body.mortgages.length).toBe(1);
            expect(result.body.mortgages).not.toStrictEqual([]);
        });
    });

    // update the mortgage
    describe("PUT /mortgages/:id", () => {
        let updatedMortgage = undefined;
        const someOtherId = "0123456789abcdef01234567";
        let id = undefined;

        beforeAll(async () => {
            let result = await MortgageRepository.getAllMortgages();
            updatedMortgage = structuredClone(oneMortgage);
            updatedMortgage.thirdPartyInfo.firstName = "Paul";
            id = result.mortgages[0]._id.toString();
        });
        test("should return the updated mortgages with a proper status code", async () => {
            const result = await request(app).put(`/mortgages/${id}`).send(updatedMortgage);
            expect(result.statusCode).toBe(200);
            expect(result.body).toHaveProperty('mortgage');
            expect(result.body.mortgage.thirdPartyInfo.firstName).toBe("Paul");

            const mortgageQuery = await Mortgage.findById(id).populate('employment').populate('extraIncome').exec();
            expect(mortgageQuery).not.toBeNull();
            expect(mortgageQuery.thirdPartyInfo.firstName).toBe("Paul");
        });

        test("should return a status code 404 is mortgage was not found", async () => {
            const result = await request(app).put(`/mortgages/${someOtherId}`).send(updatedMortgage);
            expect(result.statusCode).toBe(404);
        });
    });

    // delete the mortgage
    describe("DELETE /mortgages/:id", () => {
        let id = undefined;
        const someOtherId = "0123456789abcdef01234567";

        beforeAll(async () => {
            const mortgageQuery = await Mortgage.find();
            id = mortgageQuery[0]._id.toString();
        });

        test("Should delete this mortgage and return an empty body with a status code of 204", async () => {
            const result = await request(app).delete(`/mortgages/${id}`);
            expect(result.statusCode).toBe(204);

            const mongoQuery = await Mortgage.findById(id);
            expect(mongoQuery).toBeNull();
        });

        test("Should send a status code of 404 if the mortgage was not found", async () => {
            const result = await request(app).delete(`/mortgages/${someOtherId}`);
            expect(result.statusCode).toBe(404);
        });
    });
    // clean up in memory database
    afterAll(async () => {
        mongoose.disconnect();
        await mongod.stop();
    });
});
