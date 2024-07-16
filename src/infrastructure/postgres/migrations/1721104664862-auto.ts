import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1721104664862 implements MigrationInterface {
    name = 'Auto1721104664862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "businesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" uuid NOT NULL, "sudCategoryId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "address" character varying NOT NULL, "postIndex" character varying(6) NOT NULL, "startAt" TIME NOT NULL, "stopAt" TIME NOT NULL, "siteUrl" character varying, "logoUrl" character varying, CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "owners" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" uuid NOT NULL, "phone" character varying(11) NOT NULL, "email" character varying(100) NOT NULL, "fio" character varying NOT NULL, "imgUrl" text, "archive" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307" UNIQUE ("phone"), CONSTRAINT "UQ_df4ef717018c5dc7bd3f4ab0de5" UNIQUE ("email"), CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses" DROP CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36"`);
        await queryRunner.query(`DROP TABLE "owners"`);
        await queryRunner.query(`DROP TABLE "businesses"`);
    }

}
