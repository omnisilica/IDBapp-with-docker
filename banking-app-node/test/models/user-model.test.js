const bcrypt = require("bcrypt");
const User = require("../../src/main/model/user-model");
const mongoose = require("mongoose");

describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should hash the password before saving", async () => {
    const user = new User({
      username: "testuser500",
      password: "password123",
      email: "test500@example.com",
    });

    await user.save();

    const savedUser = await User.findOne({ username: "testuser" });

    expect(savedUser.password).not.toBe("password123");

    const isMatch = await bcrypt.compare("password123", savedUser.password);
    expect(isMatch).toBe(true);
  });
});
