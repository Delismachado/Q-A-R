import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRuleToRecommendation1606470146454 implements MigrationInterface {
    name = 'AddRuleToRecommendation1606470146454'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rules" ADD "recommendationId" character varying`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD "ruleId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recommendations" DROP COLUMN "ruleId"`);
        await queryRunner.query(`ALTER TABLE "rules" DROP COLUMN "recommendationId"`);
    }

}
