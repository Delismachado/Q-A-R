import {MigrationInterface, QueryRunner} from "typeorm";

export class AnswersByParticipation1606683585602 implements MigrationInterface {
    name = 'AnswersByParticipation1606683585602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD "participationId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "FK_6d4492027392065b6078a647758"`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "UQ_6d4492027392065b6078a647758" UNIQUE ("ruleId")`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "answers" ALTER COLUMN "questionId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "FK_6d4492027392065b6078a647758" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_9541efc3e88f8e0bd76386a10e3" FOREIGN KEY ("participationId") REFERENCES "participations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_9541efc3e88f8e0bd76386a10e3"`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "FK_6d4492027392065b6078a647758"`);
        await queryRunner.query(`ALTER TABLE "answers" ALTER COLUMN "questionId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recommendations" DROP CONSTRAINT "UQ_6d4492027392065b6078a647758"`);
        await queryRunner.query(`ALTER TABLE "recommendations" ADD CONSTRAINT "FK_6d4492027392065b6078a647758" FOREIGN KEY ("ruleId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "participationId"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
