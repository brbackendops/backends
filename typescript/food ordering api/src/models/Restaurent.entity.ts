import { ArrayType, Entity, ManyToOne, OneToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.entity";
import User from "./User.entity";
import Menus from "./Menus.entity";


@Entity()
export default class Restaurent extends BaseEntity {

    @Property({ nullable: false , type:"string" })
    name:string;

    @OneToOne(() => User,{ nullable: false })
    user_id!: User

    @Property({ nullable: false , type:"string" })
    city:string;

    @Property({ nullable: false , type:"string" })
    country:string;

    @Property({ nullable: false , type:"string" })
    imageUrl:string;

    @Property({ nullable: false , type:"decimal" })
    deliveryPrice:number;

    @Property({ nullable: false , type:"number" })
    estimatedDeliveryTime:number;

    @Property({ nullable: false , type:ArrayType })
    cuisines:string[];


    constructor(name:string,user_id:User,city:string,country:string,imageUrl:string,deliveryPrice:number,estimatedDeliveryTime:number,cuisines:string[]) {
        super()
        this.name = name;
        this.user_id = user_id;
        this.city = city;
        this.country = country;
        this.imageUrl = imageUrl;
        this.deliveryPrice = deliveryPrice;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
        this.cuisines = cuisines;
    }
}