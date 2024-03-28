import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://matmercer:Wto3gmtsYqfAm0Wn@cluster0.3smlkbg.mongodb.net/',
    ),
    UsersModule,
    PostsModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
