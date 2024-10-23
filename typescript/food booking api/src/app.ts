import 'reflect-metadata';
import express , { Express, Request , Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import http from 'http';
import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/postgresql';
import  User  from './models/User.entity';
import DbConfig from './mikro-orm.conifg';
import UserRouter from './routes/user.routes';
import RestaurentRouter from './routes/restaurent.routes';
import MenusRouter from './routes/menus.routes';
import process from 'process';
import path from 'path';
import Restaurent from './models/Restaurent.entity';
import Menus from './models/Menus.entity';

export const DI = {} as {
    server: http.Server,
    orm: MikroORM,
    em: EntityManager,
    user: EntityRepository<User>
    restaurent: EntityRepository<Restaurent>,
    menus: EntityRepository<Menus>,
}


export async function RunApp(app: Express){

    DI.orm = await MikroORM.init(DbConfig)
    DI.user = DI.orm.em.getRepository(User)
    DI.orm.getMigrator().up;

    const generator = DI.orm.getSchemaGenerator();
    await generator.updateSchema();

    app.use("/static",express.static(path.join(process.cwd(),"public/")))
    app.use("/media",express.static(path.join(process.cwd(),"public/images/")))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use((req,res,next) => RequestContext.create(DI.orm.em,next))    


    app.use("/user",UserRouter)
    app.use("/restaurent",RestaurentRouter)
    app.use("/menu",MenusRouter)

    app.get("/",async (req: Request,res: Response) => {
        return res.json({
            message: "Health Ok"
        })
    })
}