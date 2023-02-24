import { BadRequestException, Injectable } from '@nestjs/common';
import { AppDataSource } from 'data-source';
import { AuthUserDto } from './auth-user.dto/auth-user.dto';
import { AuthUsers } from './auth-user.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from 'src/dto/auth.dto';


@Injectable()
export class AuthUserService {
    constructor
    (
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}
    async signUp(createUserDto: CreateUserDto): Promise<any> {
        // Check if user exists
        const userExists = await this.usersService.findByUsername(
          createUserDto.username,
        );
        if (userExists) {
          throw new BadRequestException('User already exists');
        }
    
        // Hash password
        const hash = await this.hashData(createUserDto.password);
        const newUser = await this.usersService.create({
          ...createUserDto,
          password: hash,
        });
            const tokens = await this.getTokens(newUser.id, newUser.username);
            await this.updateRefreshToken(newUser.id, tokens.refreshToken);
            return tokens;
    }
    hashData(data: string) {
            return argon2.hash(data);
    }

    async signIn(data: AuthDto) {
      // Check if user exists
      const user = await this.usersService.findByUsername(data.username);
      if (!user) throw new BadRequestException('User does not exist');
      const passwordMatches = await argon2.verify(user.password, data.password);
      if (!passwordMatches)
        throw new BadRequestException('Password is incorrect');
      const tokens = await this.getTokens(user._id, user.username);
      await this.updateRefreshToken(user._id, tokens.refreshToken);
      return tokens;
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.update(userId, {
          refreshToken: hashedRefreshToken,
        });
    }

    async getTokens(userId: string, username: string) {
        const [accessToken, refreshToken] = await Promise.all([
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
              expiresIn: '15m',
            },
          ),
          this.jwtService.signAsync(
            {
              sub: userId,
              username,
            },
            {
              secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
              expiresIn: '7d',
            },
          ),
        ]);
    
        return {
          accessToken,
          refreshToken,
        };
    }

    async logout(userId: string) {
        return this.usersService.update(userId, { refreshToken: null });
    }



    create(createUserDto: AuthUserDto): Promise<AuthUsers> {
        const user = new AuthUsers();
        user.password = createUserDto.password;
        user.refreshToken = createUserDto.refresh_token;
        return null;
    }
 
    async getOne(ID:number):Promise<AuthUsers>{
        return await AppDataSource
        .getRepository(AuthUsers)
        .createQueryBuilder("auth_users")
        .where("id = :id", { id: ID })
        .getOne()
    
    }
    async findOne(username:string):Promise<AuthUsers>{
       const ID =  (await AppDataSource
            .getRepository(User)
            .createQueryBuilder()
            .where("username = :username", { username: username })
            .getOne()).id

        return await AppDataSource
            .getRepository(AuthUsers)
            .createQueryBuilder()
            .where("id = :id", { id: ID })
            .getOne()
    }

    async deleteOne(ID:number):Promise<void>{
       await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(AuthUsers)
        .where("id = :id", { id: ID })
        .execute()

    }
    async redactOne(ID:number):Promise<void>{
     await AppDataSource
        .createQueryBuilder()
        .update(AuthUsers)
        .set({ password : "565462414"})
        .where("id = :id", { id: ID })
        .execute()
    }
    async createOne():Promise<void>{
        const Authuser = await AppDataSource
            .getRepository(AuthUsers)
            .createQueryBuilder("user")
    }
    

    

  
    
}