const request = require('supertest');
const express = require('express');
const userService = require('../../src/main/services/user-service.js');
const userRouter  = require('../../src/main/controllers/user-controller.js'); 

jest.mock('../../src/main/services/user-service.js');

describe('UserController', () => {
  let app;

  beforeEach(() => {
      app = express(); // Create a new instance of express for each test
      app.use(express.json()); // Middleware to parse JSON body
      app.use('/customers', userRouter); // Apply the userRouter to the test app instance with the '/customers' prefix
  });

  // Tests for POST /customers/
  describe('POST /customers/', () => {
      it('should create a user successfully and return 201 status', async () => {
          const newUser = { username: 'newUser', email: 'test@test.com' };
          const expectedUser = { id: 1, ...newUser };
          userService.createUser.mockResolvedValue(expectedUser);

          const response = await request(app)
              .post('/customers/')
              .send(newUser);

          expect(response.status).toBe(201);
          expect(response.body).toEqual(expectedUser);
          expect(userService.createUser).toHaveBeenCalledWith(newUser);
      });

      it('should handle service errors and return 500 status', async () => {
          userService.createUser.mockRejectedValue(new Error('Internal server error'));

          const response = await request(app)
              .post('/customers/')
              .send({ username: 'newUser', email: 'test@test.com' });

          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty('message', 'Internal server error');
      });
  });

  // Tests for GET /customers/
  describe('GET /customers/', () => {
      it('should return all users with 200 status', async () => {
          const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
          userService.getAllUsers.mockResolvedValue(mockUsers);

          const response = await request(app).get('/customers/');

          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockUsers);
      });

      it('should handle errors and return 500 status', async () => {
          userService.getAllUsers.mockRejectedValue(new Error('Error fetching users'));

          const response = await request(app).get('/customers/');

          expect(response.status).toBe(500);
          expect(response.body).toHaveProperty('message', 'Error fetching users');
      });
  });

  // Tests for GET /customers/:id
  describe('GET /customers/:id', () => {
      it('should return a specific user when found with 200 status', async () => {
          const mockUser = { id: 1, username: 'foundUser' };
          userService.getUser.mockResolvedValue(mockUser);

          const response = await request(app).get(`/customers/${mockUser.id}`);

          expect(response.status).toBe(200);
          expect(response.body).toEqual(mockUser);
      });

      it('should return 404 when user not found', async () => {
          userService.getUser.mockResolvedValue(null);

          const response = await request(app).get('/customers/999');

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty('message', 'User not found');
      });
  });

  // Tests for DELETE /customers/:id
  describe('DELETE /customers/:id', () => {
      it('should delete a user successfully and return 200 status', async () => {
          userService.deleteUser.mockResolvedValue({ deletedCount: 1 });

          const response = await request(app).delete('/customers/1');

          expect(response.status).toBe(200);
          expect(response.body).toHaveProperty('message', 'User deleted successfully');
      });

      it('should return 404 when no user is found to delete', async () => {
          userService.deleteUser.mockResolvedValue({ deletedCount: 0 });

          const response = await request(app).delete('/customers/999');

          expect(response.status).toBe(404);
          expect(response.body).toHaveProperty('message', 'User not found');
      });
  });
});
