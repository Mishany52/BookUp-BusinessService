import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1721996030857 implements MigrationInterface {
    name = 'Auto1721996030857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" uuid NOT NULL, "phone" character varying NOT NULL, "email" character varying(100) NOT NULL, "fio" character varying NOT NULL, "imgUrl" character varying, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307" UNIQUE ("phone"), CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrators" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" uuid NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying NOT NULL, "fio" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "imgUrl" character varying, "businessId" integer, CONSTRAINT "UQ_4ee5216a00cb99b2dede98509c1" UNIQUE ("email"), CONSTRAINT "UQ_7b0f1f711db79c41959b821e68f" UNIQUE ("phone"), CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" uuid NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying NOT NULL, "fio" character varying NOT NULL, "imgUrl" character varying, "active" boolean NOT NULL DEFAULT true, "businessId" integer, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "UQ_cbc362d1c574464a63d3acc3ead" UNIQUE ("phone"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "businesses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "address" character varying NOT NULL, "weekWorkTime" json NOT NULL, "postIndex" integer NOT NULL, "siteUrl" character varying, "logoUrl" character varying, "ownerId" uuid, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "weekWorkTime" json NOT NULL, "address" character varying NOT NULL, "postIdex" integer NOT NULL, "startAt" TIME NOT NULL, "stopAt" TIME NOT NULL, "siteUrl" character varying, "logoUrl" character varying, "businessId" integer, "administratorId" uuid, CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "administrators" ADD CONSTRAINT "FK_4f97ccc0f0cc737ca6366ce21a6" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employees" ADD CONSTRAINT "FK_c0a85906f3a73c2b47f7699bda8" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_6742ed295c80ca4de9285f956af" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_49bbaaf252d55d4ca25c6906a62" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_49bbaaf252d55d4ca25c6906a62"`);
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_6742ed295c80ca4de9285f956af"`);
        await queryRunner.query(`ALTER TABLE "businesses" DROP CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_c0a85906f3a73c2b47f7699bda8"`);
        await queryRunner.query(`ALTER TABLE "administrators" DROP CONSTRAINT "FK_4f97ccc0f0cc737ca6366ce21a6"`);
        await queryRunner.query(`DROP TABLE "points"`);
        await queryRunner.query(`DROP TABLE "businesses"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "administrators"`);
        await queryRunner.query(`DROP TABLE "owners"`);
    }

}
