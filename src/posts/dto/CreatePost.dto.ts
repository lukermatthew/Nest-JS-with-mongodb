import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  contents: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
