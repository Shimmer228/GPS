import { Body, Controller, Delete, Get,Param, Post, Req, SetMetadata, UseGuards,} from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { Request } from 'express';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserService } from './auth-user.service';
import { UserService } from 'src/user/user.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';




@Controller('auth')
@UseGuards(RolesGuard)
export class AuthUserController {
  constructor(
    readonly authUserService: AuthUserService,
  ){}
  @Get()
  Hello(): string {
    return 'Hello world i guess xd';
  }
  // @Post()
  // creater(){
  //   this.authUserService.createOne();
  // }
  // @Post(':id')
  //  redacter(@Param('id') id:number){
  //    this.authUserService.redactOne(id);
  //    return "a great succes";
  // }
  // @Get(':id')
  // getter(@Param('id') id:number){
  //   return this.authUserService.getOne(id);
  // }
  // @Delete(':id')
  // deleter(@Param('id') id:number){
  //   this.authUserService.deleteOne(id);
  //   return "a great succes";
  // }
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authUserService.signUp(createUserDto);
  }
  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authUserService.signIn(data);
  }
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authUserService.logout(req.user['sub']);
  }
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request,) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authUserService.refreshTokens(userId, refreshToken);
  }

//   @Get("admin")
//   @Roles(Role.Admin)
//   adminTest() {
//   this.authUserService.testForAdmin();
// }
//   @Get("user")
//   @Roles(Role.User)
//   userTest() {
//   this.authUserService.testForUser();
// }

//   @Get("noOne")
//   noOneTest() {
//   this.authUserService.testForNoOne();
// }


@Get('admin')
@SetMetadata('roles', ['admin'])
async create() {
  this.authUserService.testForAdmin();

}
}

