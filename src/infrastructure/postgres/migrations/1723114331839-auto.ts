import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1723114331839 implements MigrationInterface {
    name = 'Auto1723114331839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "managers" ("id" SERIAL NOT NULL, "accountId" uuid NOT NULL, "email" character varying(100) NOT NULL, "fio" character varying NOT NULL, "phone" character varying NOT NULL, "active" boolean NOT NULL DEFAULT true, "imgUrl" character varying, CONSTRAINT "UQ_8d5fd9a2217bf7b16bef11fdf83" UNIQUE ("email"), CONSTRAINT "UQ_2d9710b05598e31f31fcfbd1aa0" UNIQUE ("phone"), CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "administrators_points_points" ("administratorsId" integer NOT NULL, "pointsId" integer NOT NULL, CONSTRAINT "PK_4a86bd9a9b29330d785f8183300" PRIMARY KEY ("administratorsId", "pointsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7b323664a2c8a45cf329f05480" ON "administrators_points_points" ("administratorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c7ccba31c508f2d97d4246c0a" ON "administrators_points_points" ("pointsId") `);
        await queryRunner.query(`CREATE TABLE "businesses_tags_tags" ("businessesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_278e5ed459cff12cdeb6a733ee5" PRIMARY KEY ("businessesId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a22519574392fb3b6d1a186d6" ON "businesses_tags_tags" ("businessesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_1e816a13fa0bbd1b3c862fb299" ON "businesses_tags_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "administrators_points_points" ADD CONSTRAINT "FK_7b323664a2c8a45cf329f054803" FOREIGN KEY ("administratorsId") REFERENCES "administrators"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "administrators_points_points" ADD CONSTRAINT "FK_0c7ccba31c508f2d97d4246c0af" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "businesses_tags_tags" ADD CONSTRAINT "FK_7a22519574392fb3b6d1a186d6c" FOREIGN KEY ("businessesId") REFERENCES "businesses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "businesses_tags_tags" ADD CONSTRAINT "FK_1e816a13fa0bbd1b3c862fb299d" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses_tags_tags" DROP CONSTRAINT "FK_1e816a13fa0bbd1b3c862fb299d"`);
        await queryRunner.query(`ALTER TABLE "businesses_tags_tags" DROP CONSTRAINT "FK_7a22519574392fb3b6d1a186d6c"`);
        await queryRunner.query(`ALTER TABLE "administrators_points_points" DROP CONSTRAINT "FK_0c7ccba31c508f2d97d4246c0af"`);
        await queryRunner.query(`ALTER TABLE "administrators_points_points" DROP CONSTRAINT "FK_7b323664a2c8a45cf329f054803"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1e816a13fa0bbd1b3c862fb299"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a22519574392fb3b6d1a186d6"`);
        await queryRunner.query(`DROP TABLE "businesses_tags_tags"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0c7ccba31c508f2d97d4246c0a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7b323664a2c8a45cf329f05480"`);
        await queryRunner.query(`DROP TABLE "administrators_points_points"`);
        await queryRunner.query(`DROP TABLE "managers"`);
    }

}
