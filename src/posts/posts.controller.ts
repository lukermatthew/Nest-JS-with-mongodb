import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import mongoose from 'mongoose';

@Controller('posts')
export class PostController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts() {
    const posts = await this.postsService.getPosts();
    return posts;
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const post = await this.postsService.getPostById(id);

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return post;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPost(@Body() createPostDto: CreatePostDto) {
    const posts = this.postsService.createPost(createPostDto);
    return posts;
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    const post = await this.postsService.deletePost(id);

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return post;
  }
}
