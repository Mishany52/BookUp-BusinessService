import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1723098154016 implements MigrationInterface {
    name = 'Auto1723098154016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_6742ed295c80ca4de9285f956af"`);
        await queryRunner.query(`ALTER TABLE "points" ALTER COLUMN "businessId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_6742ed295c80ca4de9285f956af" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points" DROP CONSTRAINT "FK_6742ed295c80ca4de9285f956af"`);
        await queryRunner.query(`ALTER TABLE "points" ALTER COLUMN "businessId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "points" ADD CONSTRAINT "FK_6742ed295c80ca4de9285f956af" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
