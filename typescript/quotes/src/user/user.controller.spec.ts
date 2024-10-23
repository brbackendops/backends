import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { INestApplication } from '@nestjs/common';
import { UserService } from './user.service';
import * as jwt from 'jsonwebtoken';

const mockService = () => ({
  registerUser: jest.fn(),
  loginUser: jest.fn(),
  updateProfile: jest.fn(),
  deleteUser: jest.fn(),
});

describe('UserController', () => {
  let app: INestApplication;
  let controller: UserController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: mockService,
        },
      ],
    }).compile();
    app = module.createNestApplication()
    await app.init()

    controller =await module.resolve(UserController);
    service = await module.resolve(UserService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('POST register a new user', async () => {
    const result = "user created successfully"
    jest.spyOn(service,"registerUser").mockImplementation(() => "user created successfully");

    const payload = {
      name: "test",
      email: "test@mail.com",
      password: "test"
    }
    expect(await controller.UserRegisterHandler(payload)).toBe(result)
  });

  it("POST login user", async() => {

    const payload = {
      id: "123812983-1237128312-123",
      name: "test",
      email: "test@mail.com",
      password: "test"
    }


    const token = jwt.sign(payload,'123812jkqdjqwejknlqqpweo190',{
      expiresIn: 1500
    })

    const result = {
      status: "sucesss",
      data: {
        token,
      }
    }
    const body  = {
      email: "test@mail.com",
      password: "test"
    }

    jest.spyOn(service,"loginUser").mockImplementation(() => result)
    expect(await controller.UserLoginHandler(body)).toBe(result)
  })
});
