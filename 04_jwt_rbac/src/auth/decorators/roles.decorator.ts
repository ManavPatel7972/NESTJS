import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entities/user.entity';

// this is custom decorator to set the required roles for a route
// it uses the SetMetadata function to attach the roles to the route handler
// how to used it: @Roles(UserRole.ADMIN) - this will require the user to have the ADMIN role to access the route
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
