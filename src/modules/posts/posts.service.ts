import { Injectable, Post } from "@nestjs/common";
import { AppDataSource } from "data-source";
import { Posts } from "./posts.entity";


@Injectable()
export class PostsService {
    
    async postCreater(body):Promise<any>{

        const post =  await AppDataSource
        .getRepository(Posts)
        .create({
           name:body.name,
           createdAt:body.createdAt,
           picture:body.picture,
        })

        await AppDataSource
            .getRepository(Posts)
            .save(post)
    }
    
}