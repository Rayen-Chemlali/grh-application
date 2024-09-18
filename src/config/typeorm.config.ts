// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
//
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "grh",
//   password: "root",
//   database: "grh",
//   entities: [__dirname + "/../**/*.entity{.ts,.js}"],
//   synchronize: true,
// };

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "grh",
  password: "pwd",
  database: "GRH",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: true,
};