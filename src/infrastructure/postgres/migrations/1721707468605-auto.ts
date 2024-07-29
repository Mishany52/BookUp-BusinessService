import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1721707468605 implements MigrationInterface {
    name = 'Auto1721707468605';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "sudCategoryId"`);
        await queryRunner.query(`ALTER TABLE "businesses" ADD "sudCategoryId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses" DROP COLUMN "sudCategoryId"`);
        await queryRunner.query(
            `ALTER TABLE "businesses" ADD "sudCategoryId" character varying NOT NULL`,
        );
    }
}
