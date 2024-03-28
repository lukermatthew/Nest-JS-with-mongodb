import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/Post.schemas';
import { CreatePostDto } from './dto/CreatePost.dto';
import { User } from 'src/schemas/User.schemas';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  getPosts() {
    return this.postModel.find().populate('user');
  }

  getPostById(id: string) {
    return this.postModel.findById(id);
  }

  async createPost({ userId, ...createPostDto }: CreatePostDto) {
    const user = await this.userModel.findById(userId);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newPost = new this.postModel({ ...createPostDto, user: userId });
    const savedPost = await newPost.save();

    await user.updateOne({
      $push: {
        posts: savedPost._id,
      },
    });

    return savedPost;
  }

  deletePost(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
