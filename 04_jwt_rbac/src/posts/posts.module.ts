import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    // this is for register the repository of Post entity, and we can inject it in service
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
