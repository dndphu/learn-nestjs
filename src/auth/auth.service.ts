import {
  Injectable,
//   UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { IUser } from 'src/users/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new ForbiddenException('Not found');
    }
    return user
  }
}
