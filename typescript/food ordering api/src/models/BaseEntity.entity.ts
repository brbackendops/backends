import {PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {

    @PrimaryKey({ type:"number", autoincrement: true})
    id!: number

    @Property()
    createdAt = new Date();

    @Property()
    updatedAt = new Date();

}