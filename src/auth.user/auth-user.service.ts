import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'data-source';
import { AuthUserDto } from './auth-user.dto/auth-user.dto';
import { AuthUsers } from './auth-user.entity';
import { User } from 'src/user/user.entity';



@Injectable()
export class AuthUserService {
    constructor(){}

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