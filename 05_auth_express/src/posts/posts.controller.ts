import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsSrvice: PostsService) {}

  @Post('create')
  async create(
    @Body() createPostDto: { title: string; content: string },
    @Req() req,
    @Res() res,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const post = await this.postsSrvice.create(createPostDto, req.user);

    return res.json({
      message: 'Post created successfully',
      post,
    });
  }

  @Get('all')
  async findAll(@Res() res) {
    const posts = await this.postsSrvice.findAll();
    return res.json({
      message: 'Posts fetched successfully',
      posts,
    });
  }
}
