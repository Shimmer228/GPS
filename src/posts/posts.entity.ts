import { User } from "src/auth.user/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToOne, JoinColumn } from "typeorm"

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn()
    author: User;

    @Column()
    name: string

    @Column()
    createdAt: Timestamp

    @Column()
    picture: string

}