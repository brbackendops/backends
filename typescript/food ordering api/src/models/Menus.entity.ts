import { Entity, ManyToOne, Property, TextType } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.entity";
import Restaurent from "./Restaurent.entity";


@Entity()
export default class Menus extends BaseEntity {

    @Property({ nullable: false , type:"string" })
    name:string;

    @Property({ nullable: false , type:TextType })
    description:string;

    @Property({ nullable: false , type:"string" })
    imageUrl:string;    

    @Property({ nullable: false , type:"decimal" })
    price:number;

    @Property({ default:true , type:"boolean" })
    available:boolean;


    @ManyToOne(() => Restaurent , { nullable: false , hidden: true })
    restaurent_id!:Restaurent;

    constructor(name:string,description:string,price:number,imageUrl:string,available:boolean,restaurent_id:Restaurent){
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.available = available;
        this.restaurent_id = restaurent_id;
    }
}