import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(
    readonly UserService: UserService,
  ){}

  @Get('')
  Hello(): string {
    return 'I do not wanna say hello to you, frick';
  }
  
 
  @Post(':id')
   redacter(@Param('id') id:number):void{
     this.UserService.redactOne(id);
  }
  @Get(':id')
  getter(@Param('id') id:number){
    return this.UserService.getOne(id);
  }
  @Delete(':id')
  deleter(@Param('id') id:number){
    return this.UserService.deleteOne(id);
  }


}