import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddProjectToRule1602512402463 implements MigrationInterface {
  name = 'AddProjectToRule1602512402463'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rules" ADD "projectId" uuid NOT NULL')
    await queryRunner.query(
      'ALTER TABLE "facts" DROP CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70"'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ALTER COLUMN "questionId" SET NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ADD CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_a582b357f5ff4d56454bb9e2d1a" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK _a582b357f5ff4d56454bb9e2d1a"'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" DROP CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70"'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ALTER COLUMN "questionId" DROP NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ADD CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
    await queryRunner.query('ALTER TABLE "rules" DROP COLUMN "projectId"')
  }
}
