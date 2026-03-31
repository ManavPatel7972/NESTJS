import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';
import { AuthMiddleware } from 'src/auth/middleware/auth.middleware';
import { RoleMiddlware } from 'src/auth/middleware/role.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, RoleMiddlware(['admin', 'user'])).forRoutes({
      path: 'posts/create',
      method: RequestMethod.POST,
    });

    consumer.apply(AuthMiddleware).forRoutes({
      path: 'posts/all',
      method: RequestMethod.GET,
    });
  }
}
