import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bncsperiod: number;

  @Column()
  invoice_number: number;

  @Column()
  invoice_date: number;

  @Column()
  customer: string;

  @Column()
  prdnm: number;

  @Column()
  qty: number;

  @Column()
  harga: number;
}
