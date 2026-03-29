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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { PostExistPipe } from './pipes/post-exist.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';

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

  // this route is protected by both JwtAuthGuard and RolesGuard, and requires the user to have the ADMIN role to access it
  @UseGuards(JwtAuthGuard, RolesGuard)
  // this decorator sets the required roles for this route to ADMIN, so only users with the ADMIN role can access it
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
  ): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostData: CreatePostDto): Promise<PostEntity> {
    return this.postService.create(createPostData);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
    @Body() updatePostData: UpdatePostDto,
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe, PostExistPipe) id: number,
  ): Promise<void> {
    return this.postService.delete(id);
  }
}
