import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, {
    message: 'tu 6 - 20 ki tu',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}
