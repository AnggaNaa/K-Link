import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prdnm: string;

  @Column()
  harga: number;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: User;
}
