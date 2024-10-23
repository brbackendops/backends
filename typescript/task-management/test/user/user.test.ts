import { UserRepository } from './../../src/user/user.repository';
import { Test } from "@nestjs/testing"
import { UserService } from "../../src/user/user.service"

const mockUserRepository = () => ({
    createU: jest.fn(),
    getOne: jest.fn(),
    getUser: jest.fn(),
})

describe("user register",() => {
    let userService: UserService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [UserService, {
                provide: UserRepository,
                useFactory: mockUserRepository,
            }],
        }).compile();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
    })

    it("user regsietr /user/register",() => {
        
    })

    afterEach(() => {
        console.log("after")
    })
})