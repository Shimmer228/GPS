import { Module } from '@nestjs/common';
import { AuthUserController } from './auth-user.controller';
import { AuthUserService } from './auth-user.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Module({
    imports: [ConfigModule, JwtModule.register({}), UserModule],
    controllers:[AuthUserController],
    providers:[AuthUserService,RefreshTokenStrategy,AccessTokenStrategy,
    {   
        provide: APP_GUARD,
        useClass: RolesGuard,
    }],
})
export class AuthUserModule{}
