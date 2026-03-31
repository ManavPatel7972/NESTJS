import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post')
    private postModel: Model<Post>,
  ) {}

  async create(createPostDto: { title: string; content: string }, user: User) {
    return this.postModel.create({
      ...createPostDto,
      author: user._id,
    });
  }

  async findAll() {
    return this.postModel.find().populate('author', 'email');
  }
}
