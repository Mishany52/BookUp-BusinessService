import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auto1723038634086 implements MigrationInterface {
    name = 'Auto1723038634086';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" RENAME COLUMN "postIdex" TO "postIndex"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" RENAME COLUMN "postIndex" TO "postIdex"`);
    }
}
