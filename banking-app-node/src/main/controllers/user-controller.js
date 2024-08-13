const express = require('express');
const userService = require('../services/user-service');
// use a router to handle incoming requests with the service
const router = express.Router();

class UserController {
    constructor() {
        this.createUser = this.createUser.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this); 
        this.getCustomerIdAndSecurityQuestionByUsername = this.getCustomerIdAndSecurityQuestionByUsername.bind(this);
        this.authenticateSecurityAnswerAndUserId = this.authenticateSecurityAnswerAndUserId.bind(this);
        this.getCustomerIdAndSecurityQuestionByEmail = this.getCustomerIdAndSecurityQuestionByEmail.bind(this);
        this.getUsernameById = this.getUsernameById.bind(this);

        router.post('/', this.createUser);
        router.get('/', this.getAllUsers);
        router.delete('/:id', this.deleteUser);
        router.patch('/customer/updatePassword', this.resetPassword);
        router.get('/:id', this.getUser); 
        router.patch('/customer/updateCustomer', this.updateUser);
        router.get('/idAndSecurityQuestion/byUsername', this.getCustomerIdAndSecurityQuestionByUsername);
        router.get('/customer/authenticateSecurityAnswer', this.authenticateSecurityAnswerAndUserId);
        router.get('/idAndSecurityQuestion/byEmailAddress', this.getCustomerIdAndSecurityQuestionByEmail);
        router.get('/customer/username', this.getUsernameById);
        // customer/username
         
        

    }

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: './model/user-model'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './model/user-model'
 *       500:
 *         description: Some server error
 */
    async createUser(req, res){
        try{
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: './model/user-model'
 *       500:
 *         description: Some server error
 */
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }

    async getUser(req, res) {

        try {
            const user = await userService.getUser(req.params.id);
            console.log(`Fetching user with ID: ${req.params.id}`);
            if(user) {
                res.status(200).json(user);
            } else {
                console.log(req.param.id);
                res.status(404).json({message: "User not found"});
            }
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }


       /**
     * Handles the HTTP PATCH request to update a user by ID
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
       async updateUser(req, res) {
        try {
            const { id, ...updateData } = req.body; // Changed this line
            const updatedUser = await userService.updateUser(id, updateData);
            if (updatedUser) {
                res.status(200).json({
                    status: 200,
                    message: "Successfully updated the user",
                    customer: updatedUser
                  });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Handles the HTTP PUT request to update a user by ID
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    async updateUserBefore(req, res) {
        try {
            const { id } = req.params;
            const updatedUser = await userService.updateUser(id, req.body);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
 * @swagger
 * /customers/{id}:
 * delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const userDeletionResult = await userService.deleteUser(id);
            if(userDeletionResult.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch(error) {
            res.status(500).json({message: error.message});
        }
    }

     async loginUser(req, res) {
        // Prevent login if user session already exists and is valid
        if (req.session && req.session.isAuthenticated) {
            return res.status(400).json({ message: "Already logged in" });
        }
        const { username, password } = req.body;
        console.log("Login attempt:", username);
        console.log("Password attempt:", password);
        try {
            const user = await userService.validateUser(username, password);
            
            if (user) {
                const token = userService.generateToken(user);
                console.log("Login successful for:", username);
                console.log("Login token:", token);
                req.session.user = { id: user._id, username: user.username };
                req.session.isAuthenticated = true;
                res.status(200).json({ customer: user, token: token });
            } else {
                console.log("Login failed for:", username);
                res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async resetPassword(req,res){
        const { id, password } = req.body;
       

        try{
       
            const updateResult = await userService.updateUserPassword(id,password);

            if (updateResult) {
                return res.status(200).json({ message: "Successfully updated the password" });
            } else {
                return res.status(404).json({ message: "Sorry, unable to update the password" });
            }

        } catch(error){
            return res.status(500).json({ message: "Sorry, unable to update the password" });

        }

    }

    async getCustomerIdAndSecurityQuestionByUsername(req, res) { 
        try {
            console.log("Fetching user with username:");
            console.log(req.query.username);
            const user = await userService.getUserByUsername(req.query.username);
            
            if (user) {
                res.status(200).json({ securityQuestion: user.securityQuestion, id: user._id  });
            } else {
                res.status(404).json({ message: 'No Customer exists with this username' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
    }

    async getCustomerIdAndSecurityQuestionByEmail(req, res) {
        try {
            const emailAddress = req.query.emailAddress;
            console.log(`Fetching customer with email: ${emailAddress}`);
            const user = await userService.getUserByEmail(emailAddress);
            if (user) {
                res.status(200).json({ securityQuestion: user.securityQuestion, id: user._id });
            } else {
                res.status(404).json({ message: 'No Customer exists with this email' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    async authenticateSecurityAnswerAndUserId(req, res) {
        try {
            const { id, securityAnswer } = req.query; 
            console.log("Authenticating security answer for user ID:", id);
            console.log("Security answer attempt:", securityAnswer);
            const user = await userService.getUser(id);
            console.log("User found:", user);
            if (user && user.securityAnswer === securityAnswer) {
                res.status(200).json({ authentication: true });
            } else {
                res.status(200).json({ authentication: false });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    
    async getUsernameById(req, res) {
        try {
            const id = req.query.id;
            console.log(`Fetching customer with ID: ${id}`);
            const customer = await userService.getUser(id);
            console.log(customer); 
            if (customer) {
                res.status(200).json({ username: customer.username });
            } else {
                console.log('No customer found with ID:', id); 
                res.status(404).json({ message: 'No Customer exists with this ID' });
            }
        } catch (error) {
            console.error('Error fetching customer:', error); 
            res.status(500).json({ message: error.message });
        }
    }

    async logoutUser(req, res) {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    console.error("Error during session destruction:", err);
                    return res.status(500).json({ message: "Failed to log out due to server error" });
                }
                res.clearCookie('connect.sid'); // This is the default session cookie name. Change it if yours is different.
                res.status(200).json({ message: "Logged out successfully"});
            });
        } else {
            res.status(200).json({ message: "No session to log out from"});
        }
    }
}


const userController = new UserController();

/**
 * @swagger
 * /customers:
 *  post:
 *    description: Use to create a new customer
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', userController.getAllUsers);

/**
 * @swagger
 * /customers/{id}:
 *  get:
 *    description: Use to request a customer by ID
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', userController.getUser);

/**
 * @swagger
 * /customers/{id}:
 *  delete:
 *    description: Use to delete a customer by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', userController.deleteUser);

/**
 * @swagger
 * /customer/login:
 *  post:
 *    description: Use to login a customer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /customers/logout:
 *  post:
 *    description: Use to logout a customer
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/logout', userController.logoutUser);


module.exports = {userRouter: router, userController};
