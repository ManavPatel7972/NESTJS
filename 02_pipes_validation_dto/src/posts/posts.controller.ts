import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistPipe } from 'src/pipes/post-exist.pipe';

export interface PostInterface {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
  updatedAt?: Date;
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPost = this.postService.findAll();

    if (search) {
      return extractAllPost.filter((s) =>
        s.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return extractAllPost;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe, PostExistPipe) id: number): PostInterface {
    return this.postService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  // @UsePipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     disableErrorMessages: false,
  //   }),
  // )
  // it is also possible in individual routes, but it is better to use it globally in the main.ts file, but if you want to use it in individual routes, you can use the @UsePipes decorator
  create(@Body() createPostData: CreatePostDto): PostInterface {
    return this.postService.create(createPostData);
  }

  @Patch(':id')
  updateOne(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ): PostInterface {
    return this.postService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe, PostExistPipe) id: number): void {
    this.postService.delete(id);
  }
}
