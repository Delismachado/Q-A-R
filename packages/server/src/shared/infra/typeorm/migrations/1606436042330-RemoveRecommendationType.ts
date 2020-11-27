import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveRecommendationType1606436042330 implements MigrationInterface {
    name = 'RemoveRecommendationType1606436042330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendations" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_93c47dbe62b46340c29120ef83c"`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "projectId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_93c47dbe62b46340c29120ef83c" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_93c47dbe62b46340c29120ef83c"`);
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "projectId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_93c47dbe62b46340c29120ef83c" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD "type" character varying NOT NULL`);
    }

}
