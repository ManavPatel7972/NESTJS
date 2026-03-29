import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  async create(createPostData: CreatePostDto): Promise<Post> {
    const newPost: Post = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName,
    });

    return this.postRepository.save(newPost);
  }

  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostData.title) {
      post.title = updatePostData.title;
    } else if (updatePostData.content) {
      post.content = updatePostData.content;
    } else if (updatePostData.authorName) {
      post.authorName = updatePostData.authorName;
    }

    return this.postRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    await this.postRepository.remove(post);
  }
}
