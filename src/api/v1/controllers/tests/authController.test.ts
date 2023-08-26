import request from "supertest"
import { jest } from '@jest/globals';

import { StatusCodes } from 'http-status-codes';
import app from "../../../../app";
import { User } from "../../models/users";
import { hashPassword, hashCompare } from "../../helpers/hashPassword";
import { genAccessToken,genRefreshToken } from "../../helpers/jwt";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import { response } from "express";
// import request from 'supertest';
// import app from './app'; // Import your Express app
// import { StatusCodes } from 'http-status-codes';
// import { User } from '../models/users'; 


jest.mock("../../models/users")
jest.mock("../../helpers/hashPassword",()=>{
  hashPassword: jest.fn(()=>'hashdpasswordd');
  

})
jest.mock("../../helpers/jwt", ()=>{
    genAccessToken:jest.fn(()=>'access_token');
    genRefreshToken:jest.fn(()=>'refresh_token')
})

const mockRequest = () => {
    return {
      body: {
        name:'John Doe',
        email: "test@example.com",
        password: "password123",
        role:'user'
      },
    };
  };

  const mockResponse = () => {
    return {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  };

  const mockUser = {
    _id: "6368dadd983d6c4b181e37c1",
    name: "Test User",
    email: "test@gmail.com",
    password: "hashedPassword",
        role: 'user',

  };

  
  const userLogin = {
    email: "test@gmail.com",
    password: "12345678", 
  };

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  

// describe("loginController" ,()=>{
//     it("should log in user with valid credentials", async () => {
//         const email = 'test@example.com';
//         const password = 'password123';
//         const hashedPassword = 'hashedPassword';

//         User.findOne = jest.fn().mockResolvedValue({email,password:hashedPassword})
//         const hashCompareSpy = jest.spyOn(bcrypt,"compareSync").mockReturnValue(true);
        
        
        
//     })
// })
// describe('Register Controller', () => {
//   it('should register a new user', async () => {
//     const res = await request(app)
//       .post(' /api/v1/auth/register')
//       .send({
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'testpassword',
//         role: 'user', // or any other required fields
//       });

//     expect(res.status).toBe(201);
//     expect(res.body.success).toBe(true);
//     // Add more assertions as needed
//   },100000);

//   it('should return an error for duplicate email', async () => {
//     const res = await request(app)
//       .post('/api/v1/auth/register')
//       .send({
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'testpassword',
//         role: 'user', // or any other required fields
//       });

//     expect(res.status).toBe(400);
//     expect(res.body.success).toBe(false);
//     // Add more assertions as needed
//   },100000);

//   // Add more test cases as needed
// });

// describe('Login Controller', () => {
//   it('should log in a user with correct credentials', async () => {
//     const res = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'test@example.com',
//         password: 'testpassword',
//       });

//     expect(res.status).toBe(200);
//     expect(res.body.success).toBe(true);
//     // Add more assertions as needed
//   },100000);

//   it('should return an error for invalid credentials', async () => {
//     const res = await request(app)
//       .post('/api/v1/auth/login')
//       .send({
//         email: 'test@example.com',
//         password: 'wrongpassword',
//       });

//     expect(res.status).toBe(404);
//     expect(res.body.success).toBe(false);
//     // Add more assertions as needed
//   },10000);
// });
let server;

beforeAll(async () => {
  await mongoose.connect("mongodb+srv://d:d@cluster0.2fniiaz.mongodb.net/hybr1d?retryWrites=true&w=majority");
},30000);
afterAll(async () => {
  await mongoose.connection.close();
},3000);

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("healthcheck",()=>{
  it('should give a message ok ', async() =>{
    const response=await request(app).get("/ok");
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toBe('OK')

    
  })
})
  // describe('Authentication API',  () => {
  //   it('should register a new user', async () => { 
  //     const res = await request(app)
  //       .post('/api/v1/auth/register')
  //       .send({
  //         name: 'Test User',
  //         email: 'test@example.com',
  //         password: 'testpassword', 
  //         role: 'user', // or any other required fields
  //       });

  //     expect(res.status).toBe(201);
  //     expect(res.body.success).toBe(true);
  //     // Add more assertions as needed
  //   });

  //   it('should return an error for duplicate email', async () => {
  //     const res = await request(app)
  //       .post('/api/v1/auth/register')
  //       .send({
  //         name: 'Test User',
  //         email: 'test@example.com',
  //         password: 'testpassword',
  //         role: 'user', // or any other required fields
  //       });

  //     expect(res.status).toBe(400);
  //     expect(res.body.success).toBe(false);
  //     // Add more assertions as needed
  //   });

  //   it('should log in a user with correct credentials', async () => {
  //     const res = await request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'test@example.com',
  //         password: 'testpassword',
  //       });

  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //     // Add more assertions as needed
  //   });

  //   it('should return an error for invalid credentials', async () => {
  //     const res = await request(app)
  //       .post('/api/v1/auth/login')
  //       .send({
  //         email: 'test@example.com',
  //         password: 'wrongpassword',
  //       });

  //     expect(res.status).toBe(401);
  //     expect(res.body.success).toBe(false);
  //     // Add more assertions as needed
  //   });
  // });

// Import your User model

// jest.useRealTimers();

describe('Registration API', () => {
  it('shouldnt register a new user without role', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword', 
        // role: 'user',
      });


    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Please provide all required fields") 
    // expect(response.body.data).toBe() 


    // expect(response.body.data).toHaveProperty('accessToken');
    // expect(response.body.data).toHaveProperty('refreshToken');
  });
 
  it('should return an error for duplicate email', async () => {
    // User.findOne = jest.fn().mockResolvedValueOnce('test@example.com');
    // User.findOne.mockResolvedValue({ email: 'test@example.com' });
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com' });

    // First, register a user
   const response= await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        role: 'user',
      });
// await User.findOne({email:'test@example.com'}) 
    //  jest.spyOn(User,'findOne').mockResolvedValueOnce('test@example.com')
      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User already exists")  




    });
    it('creating the user',async()=>{
      // jest.spyOn(bcrypt,"hashSync").mockResolvedValue()
      // jest.spyOn(bcrypt, "hash").mockResolvedValueOnce("hashedPassword");
      // jest.spyOn(User, "create").mockResolvedValue(mockUser); 
      // jest.spyOn(User,"create");
      
      jest.spyOn(User, "create").mockResolvedValueOnce({
        _id: "6368dadd983d6c4b181e37c1",
        name: "Test User",
        email: "test@gmail.com",
        password: "hashedPassword",
            role: 'user',
    
      });
      const response= await request(app)
      .post('/api/v1/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        role: 'user',
      });
      
   
    }) 
 

  //   // Try to register the same user again
  //   const response = await request(app)
  //     .post('/api/v1/auth/register')
  //     .send({
  //       // name: 'Another Test User',
  //       // email: 'test@example.com', // Same email as before
  //       // password: 'anotherpassword',
  //       // role: 'user',
  //     });


  //   // expect(response.status).toBe(StatusCodes.BAD_REQUEST); 
  //   // expect(response.body.success).toBe(false);
  //   // expect(response.body.error.message).toBe('User already exists');
  // });

  // Add more test cases as needed
});