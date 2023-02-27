import { Injectable } from '@nestjs/common';
import { AppDataSource } from 'data-source';
import { AuthUsers } from 'src/auth.user/auth-user.entity';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from './user.entity';


@Injectable()
export class UserService {

    async create(body: CreateUserDto): Promise<any> {

        const authuser = await AppDataSource
                .getRepository(AuthUsers)
                .save({
                    password: body.password,
                })
            console.log(authuser);

        const user =  await AppDataSource
                .getRepository(User)
                .save({
                    authUser:authuser,
                    username:body.username,
                    email:body.email,
                })
            console.log(user);
        return user;
    }

    async update(
        id: number,
        updateUserDto: UpdateUserDto,
                ): Promise<void> {
        await AppDataSource
        .createQueryBuilder()
        .update(AuthUsers)
        .set({ refreshToken: updateUserDto.refreshToken })
        .where("id = :id", { id: id })
        .execute()
    }

   async getOne(ID:number):Promise<any>{
        return await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.authUser", "authUser")
        .where("user.id = :id", { id: ID })
        .getOne()
    
    }
    async findByUsername(username: string): Promise<any> {
        return await AppDataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.authUser", "authUser")
        .where("user.username = :username", { username: username })
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
