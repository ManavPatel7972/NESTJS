import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
// this is the user schema for mongoose, it will be used to create the user collection in the database
@Schema({ timestamps: true })
export class User extends Document {
  // the @Prop decorator is used to define the properties of the user schema, it takes an object as an argument which can have the following properties:
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

// the SchemaFactory is used to create the user schema, it takes the user class as an argument and returns the user schema
export const UserSchema = SchemaFactory.createForClass(User);
