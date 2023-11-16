import "reflect-metadata";
import { DataSource, Transaction } from "typeorm";
import { Customer } from "./entities/Customer";
import { User } from "./entities/User";
import { Products } from "./entities/Product";
import { TransactionReport } from "./entities/TransactionReport";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "200799",
  database: "K-Link",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});
