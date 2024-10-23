import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserReposioty } from './user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";

const MockUserReposioty = () => ({
  getUser: jest.fn(),
  createUser: jest.fn(),
  deleteUser: jest.fn(),
  updateUser: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let repo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserReposioty,
          useFactory: MockUserReposioty,
        },
      ],
    }).compile();

    service = await module.resolve(UserService);
    repo = await module.resolve(UserReposioty);
  });

  it('user POST /Register ', async () => {
    const mockPayload = {
      name: 'test',
      email: 'test@test.com',
      password: 'test',
    };
    repo.createUser.mockResolvedValue('user created successfully')
    const result = await repo.createUser(mockPayload)
    console.log(result)
    expect(repo.createUser).toHaveBeenCalled();
    expect(result).toEqual("user created successfully")
  });

  it('user POST /Login ', async () => {

    
    const hpassword = bcrypt.hashSync("test",10)

    const mockUser = {
      id: "12637123-1283y128312-312y",
      name: 'test',
      email: 'test@test.com',
      password: hpassword,
    };
    const token = jwt.sign(mockUser,'123812jkqdjqwejknlqqpweo190',{
      expiresIn: 1000
    })

    const mockPayload = {
      email: "test@mail.com",
      password: hpassword
    }

    repo.getUser.mockResolvedValue(token)
    const result = await repo.getUser(mockPayload.email)
    console.log("token",result)
    expect(repo.getUser).toHaveBeenCalled()
    expect(result).toEqual(token)

  });

  it("user DELETE /delete", async() => {
    repo.deleteUser.mockResolvedValue("user deleted successfully")
    const id = "12637123-1283y128312-312y"
    const result = await repo.deleteUser(id)
    console.log(result)
    expect(repo.deleteUser).toHaveBeenCalled()
    expect(result).toEqual("user deleted successfully")
  });


  it("user UPDATE /update", async() => {
    repo.updateUser.mockResolvedValue("user updated successfully")
    const payload = {
      name: null,
      email: "test2@mail.com"
    }
    const id = "12637123-1283y128312-312y"
    const result = await repo.updateUser(payload,id)
    console.log(result)
    expect(repo.updateUser).toHaveBeenCalled()
    expect(result).toEqual("user updated successfully")
  })

});
