import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AppDataSource } from 'data-source';
import { AuthUserDto } from './auth-user.dto/auth-user.dto';
import { AuthUserEntity } from './auth-user.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthUserService {
  constructor(
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
    const newUser:UserEntity = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.username, newUser.role);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  hashData(data: string) {
    console.log(data);
    return argon2.hash(data);
  }

  async signIn(data: AuthDto) {
    // Check if user exists
    const user: UserEntity = await this.usersService.findByUsername(data.username);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(
      user.authUser.password,
      data.password,
    );

    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    console.log(await this.getOne(userId));
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
    // console.log(await AppDataSource
    //   .getRepository(AuthUsers))
  }

  async getTokens(userId: number, username: string, userRole: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          userRole,
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

  async logout(userId: number) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.usersService.getOne(userId);
    console.log(user);
    if (!user || !user.authUser.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.authUser.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('nope');
    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  create(createUserDto: AuthUserDto): Promise<AuthUserEntity> {
    const user = new AuthUserEntity();
    user.password = createUserDto.password;
    user.refreshToken = createUserDto.refresh_token;
    return null;
  }

  async getOne(id: number): Promise<AuthUserEntity> {
    return await AppDataSource.getRepository(AuthUserEntity)
      .createQueryBuilder('auth_users')
      .where('id = :id', { id })
      .getOne();
  }
  async findOne(username: string): Promise<AuthUserEntity> {
    const ID = (
      await AppDataSource.getRepository(UserEntity)
        .createQueryBuilder()
        .where('username = :username', { username: username })
        .getOne()
    ).id;

    return await AppDataSource.getRepository(AuthUserEntity)
      .createQueryBuilder()
      .where('id = :id', { id: ID })
      .getOne();
  }

  async deleteOne(ID: number): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(AuthUserEntity)
      .where('id = :id', { id: ID })
      .execute();
  }
  async redactOne(ID: number): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(AuthUserEntity)
      .set({ password: '565462414' })
      .where('id = :id', { id: ID })
      .execute();
  }
  async createOne(): Promise<void> {
    const Authuser = await AppDataSource.getRepository(
      AuthUserEntity,
    ).createQueryBuilder('user');
  }

  testForAdmin() {
    return 'oh i see, you are admin';
  }
  testForUser() {
    return 'ordinary one, not interested';
  }
  testForNoOne() {
    return 'and who are you supposed to be';
  }
}
