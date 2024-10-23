import { Entity } from "@mikro-orm/core";
import { IsArray, IsBoolean, IsDateString, IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty, isString } from "class-validator";
import Menus from "../models/Menus.entity";
import Restaurent from "../models/Restaurent.entity";

@Entity()
export class UserDto {

    @IsString()
    @IsNotEmpty()
    username:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    @IsNumber()
    @IsOptional()
    age?:number | undefined

    @IsDateString()
    @IsOptional()
    born?: Date | undefined

    @IsString()
    @IsNotEmpty()
    address:string;

    @IsString()
    @IsNotEmpty()
    city:string;

    @IsString()
    @IsNotEmpty()
    country:string;

    constructor(
        username: string,
        email: string,
        password: string,
        address: string,
        city: string,
        country: string,
        age?: number | undefined,
        born?: Date | undefined,
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.country = country;
        this.age = age;
        this.born = born;
    }    
}


export class UserDtoLogin {

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    constructor(email:string,password:string){
        this.email = email;
        this.password = password;
    }
}

export class UserDtoUpdate {

    @IsOptional()
    @IsNumber()
    id:number;

    @IsEmail()
    @IsOptional()
    email:string;

    @IsString()
    @IsOptional()
    username:string;

    @IsString()
    @IsOptional()
    address:string;

    @IsString()
    @IsOptional()
    city:string;

    @IsString()
    @IsOptional()
    country:string;
    
}


export class RestaurentDtoCreate {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    @IsNumber()
    user_id:number;

    @IsString()
    @IsNotEmpty()
    city:string;

    @IsString()
    @IsNotEmpty()    
    country:string;

    @IsString()
    @IsNotEmpty()    
    imageUrl:string;

    @IsDecimal()
    @IsNumber()
    @IsNotEmpty()
    deliveryPrice:number;

    @IsNumber()
    @IsNotEmpty()
    estimatedDT:number;
    
    @IsArray()
    @IsNotEmpty()
    cuisines: string[];

}


export class RestaurentDtoUpdate {

    @IsString()
    @IsOptional()
    name:string;

    @IsString()
    @IsOptional()
    city:string;

    @IsString()
    @IsOptional()    
    country:string;

    @IsString()
    @IsOptional()    
    imageUrl:string;

    @IsDecimal()
    @IsNumber()
    @IsOptional()
    deliveryPrice:number;

    @IsNumber()
    @IsOptional()
    estimatedDT:number;
    
    @IsArray()
    @IsOptional()
    cuisines: string[];

}


export class MenusDtoCreate {

    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsNotEmpty()
    restaurent_id: number;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean;

    @IsDecimal()
    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    imageUrl:string;
}


export class MenusDtoUpdate {

    @IsString()
    @IsOptional()
    name:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsBoolean()
    @IsOptional()
    available: boolean;

    @IsDecimal()
    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    imageUrl:string;
}