import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
   
    controllers:[UserController],
    providers:[UserService,],
})
export class UserModule{}