import { Entity, Property , TextType } from "@mikro-orm/core";

import { BaseEntity } from './BaseEntity.entity'

enum UserRole {
    ADMIN,
    NORMAL
}


@Entity()
export default class User extends BaseEntity {
    @Property({ type:"string",nullable: false})
    username: string;

    @Property({ type:"string" ,unique: true , nullable:false  })
    email: string;

    @Property({ type:"number", nullable: true })
    age?: number;

    @Property({  type:TextType, nullable: false  })
    address: string;

    @Property({  type:"string", nullable: false})
    city: string;

    @Property({  type:"string", nullable: false})
    country: string;

    @Property({ type:Date, nullable: true })
    born?: Date;

    @Property({ type:"string" , nullable:false})
    password: string;

    // @Property({ default: UserRole.NORMAL })
    // role:UserRole;
 

    constructor( name:string , email:string , password:string , address:string , city:string , country:string) {
        super();
        this.username = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.country = country;
    }
}