import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/user/user.module';
import { AuthController } from '../modules/auth/auth.controller';
import { AuthModule } from '../modules/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
@Module({
  imports: [CommonModule, UserModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
