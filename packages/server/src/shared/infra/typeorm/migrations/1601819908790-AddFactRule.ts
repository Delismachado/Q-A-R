import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFactRule1601819908790 implements MigrationInterface {
  name = 'AddFactRule1601819908790'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" RENAME COLUMN "questionId" TO "factId"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ALTER COLUMN "factId" DROP NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_7b7239f7e891adf7a027ee8d966" FOREIGN KEY ("factId") REFERENCES "facts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_7b7239f7e891adf7a027ee8d966"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ALTER COLUMN "factId" SET NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" RENAME COLUMN "factId" TO "questionId"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }
}
