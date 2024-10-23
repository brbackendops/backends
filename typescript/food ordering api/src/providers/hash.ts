import * as bcrypt from 'bcrypt';

export default class HashFactory {


    hashPlainPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        return hash
    }

    comparePasswords(plainP: string , hashedP: string): boolean {
        return bcrypt.compareSync(plainP,hashedP)
    }

}