import { DataSource, DataSourceOptions } from 'typeorm';
export const dbdatasource: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    synchronize: true,
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/migration/*.ts'],
    migrationsTableName: "migration",

};

const dataSource = new DataSource(dbdatasource)
export default dataSource