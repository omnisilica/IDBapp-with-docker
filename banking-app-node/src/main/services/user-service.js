// use the repository to handel complex buisness logic heres
const bcrypt = require('bcrypt');
const userRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');

class UserService {
    async createUser(userData) {
        return userRepository.createUser(userData);
    }

    async getAllUsers() {
        return userRepository.findAllUsers();
    }

    async getUser(userId) {
        return userRepository.findUserById(userId);
    }

    async deleteUser(id) {
        return userRepository.deleteUserById(id);
    }

    async validateUser(username, password) {
        const user = await userRepository.findUserByUsername(username);
        if (!user) {
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return null;
        }

        return user; // User is valid
    }

    
    
    generateToken(user) {
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            'your_secret_key', // Replace with environment variable
            { expiresIn: '10 min' }
        );
        return token;
    }

    async getUserByEmail(email) {
        return userRepository.findUserByEmail(email);
    }

    async updateUserPassword(userID, newPassword){
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return userRepository.findUserByIdAndUpdatePassword(userID,hashedPassword);
    }
    /**
     * Updates a user by ID
     * @param {String} id - The ID of the user to update
     * @param {Object} updateData - The data to update the user with
     * @returns {Promise<Object>} - The updated user object
     */
    async updateUser(id, updateData) {
        return userRepository.updateUserById(id, updateData);
    }

    async getUserByUsername(username) {
        return userRepository.findUserByUsername(username);
    }

}

module.exports = new UserService();
