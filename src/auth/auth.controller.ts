import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { SigninUserDto } from './dto/signin-user.dto';
// import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
//   @UseFilters(new HttpExceptionFilter())
  async login(@Body() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signIn(username, password);
  }
}
