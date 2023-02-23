import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [JwtModule.register({})],
    controllers:[UserController],
    providers:[UserService,],
})
export class UserModule{}