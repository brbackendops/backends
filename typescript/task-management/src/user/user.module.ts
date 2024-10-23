import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: "jwt"}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject:[ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get("JWT_SECRET"),
                signOptions:{
                    expiresIn: 7200,
                },                
            }),
        }),
        TypeOrmModule.forFeature([User]),
    ],
    controllers:[UserController],
    providers:[
        UserService,
        UserRepository,
        JwtStrategy,
        UserRepository,
    ],
    exports:[
        JwtStrategy,
        PassportModule,
    ]
})
export class UserModule {
}
