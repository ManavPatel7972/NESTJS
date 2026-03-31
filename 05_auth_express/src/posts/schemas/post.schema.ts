import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Documents are the basic building blocks of a mongoose schema, they are used to define the structure of the data that will be stored in the database
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
