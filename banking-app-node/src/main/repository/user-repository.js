// import the database schema here and implement basic crud operations
const User = require('../model/user-model');

class UserRepository {
    async createUser(userData) {
        const user = new User(userData);
        return user.save();
    }

    async findAllUsers() {
        return User.find();
    }

    async findUserById(userId){
        return User.findById(userId);
    }

    async deleteUserById(id) {
        return User.deleteOne({ _id: id});
    }

    async findUserByUsername(username) {
        try {
            const user = await User.findOne({ username: username });
            return user;
          } catch (error) {
            console.error("Error finding user by username:", error);
            throw error;
          }
    }

    async findUserByEmail(email) {
        return User.findOne({ email: email });
    }

    async findUserByIdAndUpdatePassword(userID, newPassword){
        return User.findByIdAndUpdate(userID, { password: newPassword }, { new: true });
    }

     /**
     * Updates a user by ID
     * @param {String} id - The ID of the user to update
     * @param {Object} updateData - The data to update the user with
     * @returns {Promise<Object>} - The updated user object
     */
     async updateUserById(id, updateData) {
        
        return User.findByIdAndUpdate(id, updateData, { new: true });
    }

    

}
module.exports = new UserRepository();
