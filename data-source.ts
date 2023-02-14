import { AuthUser1676286259930 } from "migrations/1676286259930-AuthUser";
import { UsersInfo1676286285196 } from "migrations/1676286285196-UsersInfo";
import { Posts1676286296829 } from "migrations/1676286296829-Posts";
import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
    synchronize: false,
    migrationsRun: false,
    name: 'default',
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: [AuthUser1676286259930,UsersInfo1676286285196,Posts1676286296829],
});
