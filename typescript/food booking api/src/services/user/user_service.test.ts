import { afterEach , describe , it , beforeEach  } from "node:test";
import UserRepo from "../../repos/user/user_repo";
import { UserService } from "./user_service";
import { UserDto, UserDtoLogin } from "../../dto";
import User from "../../models/User.entity";
import { MikroORM } from "@mikro-orm/postgresql";


jest.mock("../../repos/user/user_repo")

describe("testing user service", () => {
    let userrepo: UserRepo;

    beforeEach(async () => {
        const orm = {} as MikroORM;
        userrepo = new UserRepo(orm);
    })


    it("test for creating user", async() => {
        const payload: UserDto = {
            username: "test1",
            password: "test1",
            email: "test1@email.com",
            age:22,
            country:"india",
            address: "street 1 road 53 flat no.4 room 62",
            city:"noida"
        }

        const user = await userrepo.createUser(payload)
        console.log("got",user)
        expect(userrepo.createUser).toHaveBeenCalledWith(payload)

        // expect(user).toBeDefined()
        expect(user).not.toBe(null)
        expect(user).toEqual(payload)
    })

    afterEach(async () => {
        jest.clearAllMocks()
        console.log("testing completed")
    })

});