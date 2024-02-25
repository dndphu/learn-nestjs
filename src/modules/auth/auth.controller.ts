import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signIn(username, password);
  }
}
