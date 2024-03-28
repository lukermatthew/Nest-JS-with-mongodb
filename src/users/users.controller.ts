import {
  Body,
  Controller,
  Get,
  Patch,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class usersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    const user = this.usersService.getUsers();
    return user;
  }

  @Get(':id')
  async getUsersById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const user = await this.usersService.getUsersById(id);

    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = this.usersService.createUser(createUserDto);
    return newUser;
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);

    if (!isValid)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    const updateUser = this.usersService.updateUser(id, updateUserDto);

    if (!updateUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return updateUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const deleteUser = await this.usersService.deleteUser(id);

    if (!deleteUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return deleteUser;
  }
}
