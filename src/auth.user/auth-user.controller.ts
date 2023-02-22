import { Body, Controller, Delete, Get,Param, Post} from '@nestjs/common';
import { AuthUserService } from './auth-user.service';



@Controller('auth-user')
export class AuthUserController {
  constructor(
    readonly authUserService: AuthUserService,
  ){}
  @Get()
  Hello(): string {
    return 'Hello world i guess xd';
  }
  @Post()
  creater(){
    this.authUserService.createOne();
  }
  @Post(':id')
   redacter(@Param('id') id:number){
     this.authUserService.redactOne(id);
     return "a great succes";
  }
  @Get(':id')
  getter(@Param('id') id:number){
    return this.authUserService.getOne(id);
  }
  @Delete(':id')
  deleter(@Param('id') id:number){
    this.authUserService.deleteOne(id);
    return "a great succes";
  }

  
  }
  




