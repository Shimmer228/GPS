import { AuthUsers } from "src/auth.user/auth-user.entity"
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from "typeorm"


@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(type => AuthUsers) @JoinColumn() 
    authUser: AuthUsers;

    @Column()
    email: string;

    @Column()
    phone: string; 
    
    @Column()
    username: string; 
    
    @Column()
    country: string; 
    
    @Column({default: "user"})
    role: string;
    
    @Column()
    avatar: string; 
       
    @CreateDateColumn()
    created_at:Date;

   
}