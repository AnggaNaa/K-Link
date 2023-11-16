import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./Product";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Products, (product) => product.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  product: Products[];
}
