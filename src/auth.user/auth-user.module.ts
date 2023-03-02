import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [AuthUserController],
  providers: [
    AuthUserService,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    UserService,
  ],
})
export class AuthUserModule {}
