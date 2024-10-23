import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserBody } from './dtos/create-user-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userepo: UserRepository,
  ) {
    super({
      secretOrKey: '123712kjldkqwl',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: UserBody): Promise<User> {
    const { username, password } = payload;
    const user = await this.userepo.getOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
