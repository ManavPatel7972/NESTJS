import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interface/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: 'first Title',
      content: 'first Content',
      authorName: 'first authorName',
      createdAt: new Date(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id == id);

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  create(createPostData: CreatePostDto): Post {
    const newPost: Post = {
      id: this.getNextId(),
      ...createPostData,
      createdAt: new Date(),
    };

    this.posts.push(newPost);
    return newPost;
  }

  private getNextId(): number {
    return this.posts.length > 0
      ? Math.max(...this.posts.map((m) => m.id)) + 1
      : 1;
  }

  update(id: number, updatePostData: UpdatePostDto): Post {
    const postIdx = this.posts.findIndex((p) => p.id == id);

    if (postIdx === -1) {
      throw new NotFoundException(`Post With ID ${id} not found`);
    }

    this.posts[postIdx] = {
      // this is to make sure that we are not losing any existing data that is not being updated
      ...this.posts[postIdx],
      // this is to update the existing data with the new data that is being passed in the updatePostData
      ...updatePostData,
      updatedAt: new Date(),
    };

    return this.posts[postIdx];
  }

  delete(id: number): { message: string } {
    const postIdx = this.posts.findIndex((p) => p.id === id);

    if (postIdx === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    this.posts.splice(postIdx, 1);
    return { message: `Post with id ${id} has been deleted successfully` };
  }
}
