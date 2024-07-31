import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1722244627028 implements MigrationInterface {
    name = 'Auto1722244627028';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "administrators" ("id" SERIAL NOT NULL, "accountId" uuid NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying NOT NULL, "fio" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "imgUrl" character varying, "businessId" integer, CONSTRAINT "UQ_4ee5216a00cb99b2dede98509c1" UNIQUE ("email"), CONSTRAINT "UQ_7b0f1f711db79c41959b821e68f" UNIQUE ("phone"), CONSTRAINT "PK_aaa48522d99c3b6b33fdea7dc2f" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "employees" ("id" SERIAL NOT NULL, "accountId" uuid NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying NOT NULL, "fio" character varying NOT NULL, "imgUrl" character varying, "active" boolean NOT NULL DEFAULT true, "businessId" integer, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "UQ_cbc362d1c574464a63d3acc3ead" UNIQUE ("phone"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "points" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "weekWorkTime" json NOT NULL, "address" character varying NOT NULL, "postIdex" integer NOT NULL, "startAt" TIME NOT NULL, "stopAt" TIME NOT NULL, "siteUrl" character varying, "logoUrl" character varying, "businessId" integer, "administratorId" integer, CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "sudCategoryId"`);
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "stopAt"`);
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "weekWorkTime" json NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "businesses" DROP CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36"`,
        );
        await queryRunner.query(
            `ALTER TABLE "owners" DROP CONSTRAINT "PK_42838282f2e6b216301a70b02d6"`,
        );
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "owners" ADD CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id")`,
        );
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "imgUrl" character varying`);
        await queryRunner.query(
            `ALTER TABLE "businesses" DROP CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8"`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id")`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "postIndex"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "postIndex" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "ownerId" integer`);
        await queryRunner.query(
            `ALTER TABLE "administrators" ADD CONSTRAINT "FK_4f97ccc0f0cc737ca6366ce21a6" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "employees" ADD CONSTRAINT "FK_c0a85906f3a73c2b47f7699bda8" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "points" ADD CONSTRAINT "FK_6742ed295c80ca4de9285f956af" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "points" ADD CONSTRAINT "FK_49bbaaf252d55d4ca25c6906a62" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "points" DROP CONSTRAINT "FK_49bbaaf252d55d4ca25c6906a62"`,
        );
        await queryRunner.query(
            `ALTER TABLE "points" DROP CONSTRAINT "FK_6742ed295c80ca4de9285f956af"`,
        );
        await queryRunner.query(
            `ALTER TABLE "businesses" DROP CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36"`,
        );
        await queryRunner.query(
            `ALTER TABLE "employees" DROP CONSTRAINT "FK_c0a85906f3a73c2b47f7699bda8"`,
        );
        await queryRunner.query(
            `ALTER TABLE "administrators" DROP CONSTRAINT "FK_4f97ccc0f0cc737ca6366ce21a6"`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "ownerId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "postIndex"`);
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD "postIndex" character varying(6) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "businesses" DROP CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8"`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "id"`);
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
        );
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id")`,
        );
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "imgUrl" text`);
        await queryRunner.query(
            `ALTER TABLE "owners" DROP CONSTRAINT "PK_42838282f2e6b216301a70b02d6"`,
        );
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "id"`);
        await queryRunner.query(
            `ALTER TABLE "owners" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
        );
        await queryRunner.query(
            `ALTER TABLE "owners" ADD CONSTRAINT "PK_42838282f2e6b216301a70b02d6" PRIMARY KEY ("id")`,
        );
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD CONSTRAINT "FK_02e7bfb8e766e8e0ef449cc0f36" FOREIGN KEY ("ownerId") REFERENCES "owners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "weekWorkTime"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "startAt" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "stopAt" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "sudCategoryId" integer`);
        await queryRunner.query(`DROP TABLE "points"`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`DROP TABLE "administrators"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }
}
