import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostExistPipe implements PipeTransform {
  constructor(private readonly postService: PostsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const post: Post = await this.postService.findOne(value);
      if (!post) {
        throw new NotFoundException(`Post with id ${value} not found`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      throw new NotFoundException(`Post with id ${value} not found`);
    }
    return value;
  }
}
