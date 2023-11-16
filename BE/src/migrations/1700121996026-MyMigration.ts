import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1700121996026 implements MigrationInterface {
    name = 'MyMigration1700121996026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "prdnm" character varying NOT NULL, "harga" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "customer" character varying NOT NULL, "division" character varying NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "invoice_Number" integer NOT NULL, "invoice_date" TIMESTAMP NOT NULL, "customer" character varying NOT NULL, "qty" character varying NOT NULL, "total_amount" integer NOT NULL, "total_count" integer NOT NULL, "product_detail" character varying NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_report" ("id" SERIAL NOT NULL, "bncsperiod" integer NOT NULL, "invoice_number" integer NOT NULL, "invoice_date" integer NOT NULL, "customer" character varying NOT NULL, "prdnm" integer NOT NULL, "qty" integer NOT NULL, "harga" integer NOT NULL, CONSTRAINT "PK_e021c205dab9a06edf9eeb14b16" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction_report"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
