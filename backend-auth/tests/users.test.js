const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        username: "john_doe_99",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Male",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
        address: "1234 Helsinki Street, Finland",
        profile_picture: "https://example.com/john.jpg", // Optional field
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
    });

    it("should return an error with missing required fields", async () => {
      // Arrange
      const userData = {
        email: "test@example.com",
        password: "invalidpassword",
        phone_number: "1234567890",
        date_of_birth: "1990-01-01",
        membership_status: "Active",
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });

    it("should return an error if the username already exists", async () => {
      // Arrange
      const userData = {
        name: "John Doe",
        username: "john_doe_99", // Same username as the previous user
        password: "AnotherPassword123",
        phone_number: "09-123-99999",
        gender: "Male",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
        address: "5678 Espoo Street, Finland",
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        username: "john_doe_99", // Use username instead of email
        password: "R3g5T7#gh",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("should return an error with invalid credentials", async () => {
      // Arrange
      const userData = {
        username: "john_doe_99", // Correct username but wrong password
        password: "wrongpassword",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
