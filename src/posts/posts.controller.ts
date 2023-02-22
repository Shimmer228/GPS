import { Body, Controller, Post } from "@nestjs/common";
import { PostsService } from './posts.service';
import { PostDto } from "./posts.dto/posts.dto";


@Controller('posts')
export class PostsController {

    @Post()
    creator(@Body() PostDto:PostDto){
        //PostsService.postCreater(PostDto)
        return "success...i guess"
    }

}