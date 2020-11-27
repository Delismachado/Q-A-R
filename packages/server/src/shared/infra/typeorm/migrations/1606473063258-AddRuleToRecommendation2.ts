import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRuleToRecommendation21606473063258 implements MigrationInterface {
    name = 'AddRuleToRecommendation21606473063258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rules" DROP COLUMN "recommendationId"`);
        await queryRunner.query(`ALTER TABLE "rules" ADD "recommendationId" uuid`);
        await queryRunner.query(`ALTER TABLE "rules" ADD CONSTRAINT "UQ_0faa9bb86af2441ad11abf36e5e" UNIQUE ("recommendationId")`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP COLUMN "ruleId"`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD "ruleId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rules" ADD CONSTRAINT "FK_0faa9bb86af2441ad11abf36e5e" FOREIGN KEY ("recommendationId") REFERENCES "recommendations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "FK_6d4492027392065b6078a647758" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "FK_6d4492027392065b6078a647758"`);
        await queryRunner.query(`ALTER TABLE "rules" DROP CONSTRAINT "FK_0faa9bb86af2441ad11abf36e5e"`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "UQ_6d4492027392065b6078a647758"`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP COLUMN "ruleId"`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD "ruleId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rules" DROP COLUMN "recommendationId"`);
        await queryRunner.query(`ALTER TABLE "rules" ADD "recommendationId" character varying`);
    }

}
