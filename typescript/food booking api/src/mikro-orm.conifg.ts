import 'dotenv/config'
import { Migrator } from '@mikro-orm/migrations';
import  User  from './models/User.entity';
import { PostgreSqlDriver , defineConfig } from '@mikro-orm/postgresql';
import Restaurent from './models/Restaurent.entity';
import Menus from './models/Menus.entity';


export default defineConfig({
    entities: [User,Restaurent,Menus],
    driver: PostgreSqlDriver,
    dbName: process.env.DB_NAME || "foodsCornerDb",
    clientUrl: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}?sslmode=${process.env.SSL_MODE || 'disable'}`,
    debug: true,
    connect: true,
    extensions:[Migrator],
    allowGlobalContext: true,
})

