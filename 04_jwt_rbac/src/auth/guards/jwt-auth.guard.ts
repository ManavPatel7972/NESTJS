import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// this guard will use the 'jwt' strategy defined in the AuthModule
// this is used to protect routes that require authentication
export class JwtAuthGuard extends AuthGuard('jwt') {}
