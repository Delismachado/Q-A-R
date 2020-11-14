/* eslint-disable indent */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddQuestionTableInheritance1601772655497
  implements MigrationInterface {
  name = 'AddQuestionTableInheritance1601772655497'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "questions" DROP COLUMN "type"')
    await queryRunner.query('DROP TYPE "public"."questions_type_enum"')
    await queryRunner.query(
      'ALTER TABLE "questions" ADD "type" character varying NOT NULL'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_e3727a7829444b69ba3c74c138" ON "questions" ("type") '
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_e3727a7829444b69ba3c74c138"')
    await queryRunner.query('ALTER TABLE "questions" DROP COLUMN "type"')
    await queryRunner.query(
      "CREATE TYPE \"public\".\"questions_type_enum\" AS ENUM('true or false', 'choices', 'multiple choices', 'numeric range', 'text')"
    )
    await queryRunner.query(
      'ALTER TABLE "questions" ADD "type" "questions_type_enum" NOT NULL DEFAULT \'true or false\''
    )
  }
}
