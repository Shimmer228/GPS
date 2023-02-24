import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, JwtModule.register({}), UserModule],
    controllers:[AuthUserController],
    providers:[AuthUserService,RefreshTokenStrategy,AccessTokenStrategy],
})
export class AuthUserModule{}
