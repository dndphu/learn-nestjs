import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { comparePassword } from '../../utils/hasing';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new ForbiddenException('Not found user');
    }
    const validate = await comparePassword(password, user.password);
    if (!validate) {
      return new UnauthorizedException();
    }
    const payload = { user: user._id };
    // const token = await this.jwtService.signAsync(payload);

    return user;
  }
}
