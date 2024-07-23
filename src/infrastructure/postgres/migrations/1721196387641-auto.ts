import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1721196387641 implements MigrationInterface {
    name = 'Auto1721196387641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" RENAME COLUMN "archive" TO "active"`);
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "owners" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "owners" RENAME COLUMN "active" TO "archive"`);
    }

}
