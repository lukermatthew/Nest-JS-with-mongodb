import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schemas';
import { PostController } from './posts.controller';
import { PostsService } from './posts.service';
import { User, UserSchema } from 'src/schemas/User.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostsModule {}
