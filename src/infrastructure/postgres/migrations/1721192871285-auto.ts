import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1721192871285 implements MigrationInterface {
    name = 'Auto1721192871285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "phone" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307" UNIQUE ("phone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" DROP CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307"`);
        await queryRunner.query(`ALTER TABLE "owners" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "owners" ADD "phone" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "owners" ADD CONSTRAINT "UQ_f9635fa45f0cc7d71023abb3307" UNIQUE ("phone")`);
    }

}
