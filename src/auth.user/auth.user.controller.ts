import { Controller, Get } from '@nestjs/common';
@Controller('user')
export class AuthUserController {
  @Get()
  Hello(): string {
    return 'Hello world i guess xd';
  }
}