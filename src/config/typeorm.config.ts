import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: "123",
    // password: '1025',
    database: 'InScetchBook',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    //entities: [__dirname + '/../**/*.entity.js'],
    /* migrations: ["migration/*.js"],
    cli: {
        migrationsDir: "migration"
    } */
}