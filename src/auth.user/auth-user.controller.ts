import { Body, Controller, Delete, Get,Param, Post, Req,} from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { Request } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserService } from './auth-user.service';



@Controller('auth')
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
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authUserService.signUp(createUserDto);
  }
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authUserService.signIn(data);
  }

  @Get('logout')
  logout(@Req() req: Request) {
    this.authUserService.logout(req.user['sub']);
  }
  
}

