import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Post } from 'src/posts/interface/post.interface';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostExistPipe implements PipeTransform {
  constructor(private readonly postService: PostsService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata): Post {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.postService.findOne(value);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new NotFoundException(`Post with id ${value} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  }
}
