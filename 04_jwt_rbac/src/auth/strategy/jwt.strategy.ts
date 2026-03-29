import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';

@Injectable()
// this class is responsible for validating the JWT token and extracting the user information from it
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // this super() method is used to configure the strategy, and it takes an options object as an argument and verify the token from the request header and also set the secret key for signing the token
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'default_secret_key',
    });
  }

  // this method is called after the token is verified, and the payload is passed to it
  // the payload is the decoded token, and it contains the user information that was encoded in the token
  validate(payload: User) {
    return {
      id: payload.id,
      username: payload.name,
      roles: payload.role,
    };
  }
}
