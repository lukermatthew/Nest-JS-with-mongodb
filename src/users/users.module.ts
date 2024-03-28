import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schemas';
import { UsersService } from './users.service';
import { usersController } from './users.controller';
import {
  UserSettings,
  UserSettingsSchema,
} from 'src/schemas/UserSettings.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserSettings.name,
        schema: UserSettingsSchema,
      },
    ]),
  ],
  controllers: [usersController],
  providers: [UsersService],
})
export class UsersModule {}
