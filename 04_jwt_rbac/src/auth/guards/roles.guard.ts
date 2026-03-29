import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '../entities/user.entity';

@Injectable()
// this guard will check if the user has the required roles to access a route
// it uses the Reflector to get the roles metadata set by the @Roles decorator
// is is compulsory for custom guards to implement the CanActivate interface, and the canActivate method will be called by NestJS to determine if the user can access the route]
// but first create custom decorator to set the required roles for a route, and then use this guard to check if the user has the required roles to access the route
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // this method will be called by NestJS to determine if the user can access the route
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());

    if (!roles) {
      return true; // if no roles are required, allow access
    }

    // get the user from the request object (set by the JwtAuthGuard)
    // switchToHttp() is used to get the HTTP request context, and getRequest() retrieves the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return roles.includes(user.role); // check if the user's role is in the required roles
  }
}
