import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'data-source';
import { AuthUserDto } from 'src/auth.user/auth-user.dto/auth-user.dto';
import { AuthUsers } from 'src/auth.user/auth-user.entity';
import { UserDto } from './user.dto/user.dto';
import { User } from './user.entity';


@Injectable()
export class UserService {
    create(createUserDto: UserDto): Promise<User> {
        /*const user = new User();
        user.password = createUserDto.password;
        user.refreshToken = createUserDto.refresh_token;
        */
        return null;
    }
    
   async getOne(ID:number):Promise<User>{
        return await AppDataSource
        .getRepository(User)
        .createQueryBuilder("users")
        .where("user.id = :id", { id: ID })
        .getOne()
    
    }
    async deleteOne(ID:number):Promise<void>{
       await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(User)
        .where("id = :id", { id: ID })
        .execute()

    }
    async redactOne(ID:number):Promise<void>{
     await AppDataSource
        .createQueryBuilder()
        .update(User)
        .set({ password : "565462414"})
        .where("id = :id", { id: ID })
        .execute()
    }
    async getUser(username:string):Promise<User>{
        return await AppDataSource
        .getRepository(User)
        .createQueryBuilder()
        .where("username = :username", { username: username })
        .getOne()
       }

        // async createOne(body: Auth_User_dto):Promise<any>{
        //    const authuser = await AppDataSource
        //         .getRepository(AuthUsers)
        //         .save({
        //             password: body.password,
        //         })
        //     console.log(authuser);

        //     const user =  await AppDataSource
        //         .getRepository(User)
        //         .save({
        //             authUser:authuser,
        //             username:body.username,
        //             role:body.role,
        //         })
        //     console.log(user);

                // await AppDataSource
                //     .getRepository(User)
                //     .save(user)
               
                
      
        // async create(body: UserDto): Promise<User> {
           
        //     const user = this.User.create(body);
        //     user.authUser = await this.authUsersEntity.save(
        //       this.authUsersEntity.create(
        //         new AuthUserCreateDto({
        //           password: body.password,
                  
        //         }),
        //       ),
        //     );
        //     return this.usersEntity.save(user);
        //   }
        


}
