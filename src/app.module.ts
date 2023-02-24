import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from 'data-source';
import { AuthUserModule } from './auth.user/auth-user.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthUserModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor() {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  }
}
