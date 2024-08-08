import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1723099120718 implements MigrationInterface {
    name = 'Auto1723099120718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points_employees_employees" ("pointsId" integer NOT NULL, "employeesId" integer NOT NULL, CONSTRAINT "PK_7713168447d3bdaae2e7f0bd92c" PRIMARY KEY ("pointsId", "employeesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_57366b14ee1076900a9b9181f3" ON "points_employees_employees" ("pointsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ed3e58c8b523ed9959837933db" ON "points_employees_employees" ("employeesId") `);
        await queryRunner.query(`CREATE TABLE "points_tags_tags" ("pointsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_77aef54527c341d58d133bb1b0e" PRIMARY KEY ("pointsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b5a3772a37400a862ff81aec7e" ON "points_tags_tags" ("pointsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d0811238962753e2c66f29fc38" ON "points_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "points" DROP COLUMN "stopAt"`);
        await queryRunner.query(`ALTER TABLE "points" DROP COLUMN "startAt"`);
        await queryRunner.query(`ALTER TABLE "points_employees_employees" ADD CONSTRAINT "FK_57366b14ee1076900a9b9181f3e" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "points_employees_employees" ADD CONSTRAINT "FK_ed3e58c8b523ed9959837933dbd" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "points_tags_tags" ADD CONSTRAINT "FK_b5a3772a37400a862ff81aec7e5" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "points_tags_tags" ADD CONSTRAINT "FK_d0811238962753e2c66f29fc38a" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points_tags_tags" DROP CONSTRAINT "FK_d0811238962753e2c66f29fc38a"`);
        await queryRunner.query(`ALTER TABLE "points_tags_tags" DROP CONSTRAINT "FK_b5a3772a37400a862ff81aec7e5"`);
        await queryRunner.query(`ALTER TABLE "points_employees_employees" DROP CONSTRAINT "FK_ed3e58c8b523ed9959837933dbd"`);
        await queryRunner.query(`ALTER TABLE "points_employees_employees" DROP CONSTRAINT "FK_57366b14ee1076900a9b9181f3e"`);
        await queryRunner.query(`ALTER TABLE "points" ADD "startAt" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "points" ADD "stopAt" TIME NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0811238962753e2c66f29fc38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5a3772a37400a862ff81aec7e"`);
        await queryRunner.query(`DROP TABLE "points_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ed3e58c8b523ed9959837933db"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57366b14ee1076900a9b9181f3"`);
        await queryRunner.query(`DROP TABLE "points_employees_employees"`);
    }

}
