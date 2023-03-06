import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('auth_users')
export class AuthUserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    password: string

    @Column()
    refreshToken: string 
}