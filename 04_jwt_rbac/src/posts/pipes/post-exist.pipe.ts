import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostExistPipe implements PipeTransform {
  constructor(private readonly postService: PostsService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const post: Post = await this.postService.findOne(value);
      if (!post) {
        throw new NotFoundException(`Post with id ${value} not found`);
      }
    } catch (e: any) {
      throw new NotFoundException(`Post with id ${value} not found`);
    }
    return value;
  }
}
