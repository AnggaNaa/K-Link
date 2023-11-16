import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  invoice_Number: number;

  @Column()
  invoice_date: Date;

  @Column()
  customer: string;

  @Column()
  qty: string;

  @Column()
  total_amount: number;

  @Column()
  total_count: number;

  @Column()
  product_detail: string;
}
