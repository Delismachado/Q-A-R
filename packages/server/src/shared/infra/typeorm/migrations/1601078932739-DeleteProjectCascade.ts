import { MigrationInterface, QueryRunner } from 'typeorm'

export class DeleteProjectCascade1601078932739 implements MigrationInterface {
  name = 'DeleteProjectCascade1601078932739'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "facts" DROP CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70"'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ADD CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "facts" DROP CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70"'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ADD CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }
}
