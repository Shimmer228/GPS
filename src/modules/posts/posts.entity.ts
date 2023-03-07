import { UserEntity } from "src/modules/user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToOne, JoinColumn } from "typeorm"

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
    @JoinColumn()
    author: UserEntity;

    @Column()
    name: string

    @Column()
    createdAt: Timestamp

    @Column()
    picture: string

}