const request = require('supertest');
const express = require('express');
const employeeService = require('../../main/services/employee-service');
jest.mock('../../main/services/employee-service.js'); // Mock the employeeService

const employeeController = require('../../main/controllers/employee-controller');

const app = express();
app.use(express.json());
app.use(employeeController);

describe('EmployeeController', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return a 200 status and a message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "It is here" });
    });
  });

  describe('POST /create', () => {
    it('should create a new employee and return a 200 status', async () => {
      const mockEmployee = { id: 1, name: 'Test User' };
      employeeService.createEmployee.mockResolvedValue(mockEmployee);

      const response = await request(app)
        .post('/create')
        .send({ name: 'Test User' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEmployee);
      expect(employeeService.createEmployee).toHaveBeenCalledWith({ name: 'Test User' });
    });

    it('should return a 500 status on service failure', async () => {
      employeeService.createEmployee.mockRejectedValue(new Error('Service failure'));

      const response = await request(app)
        .post('/create')
        .send({ name: 'Test User' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Service failure' });
    });
  });

  describe('POST /login-employee', () => {
    // Add your tests for loginEmployee here
    // You can mock different scenarios like successful login, already logged in, or login failure
  });
});