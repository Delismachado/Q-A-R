import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRulesInheritance1601818938970 implements MigrationInterface {
  name = 'AddRulesInheritance1601818938970'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "rules" DROP COLUMN "exactValue"')
    await queryRunner.query('ALTER TABLE "rules" DROP COLUMN "operator"')
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ALTER COLUMN "questionId" SET NOT NULL'
    )
    await queryRunner.query('ALTER TABLE "rules" DROP COLUMN "type"')
    await queryRunner.query('DROP TYPE "public"."rules_type_enum"')
    await queryRunner.query(
      'ALTER TABLE "rules" ADD "type" character varying NOT NULL'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_63a50686037384766a955cb5c9" ON "rules" ("type") '
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e"'
    )
    await queryRunner.query('DROP INDEX "IDX_63a50686037384766a955cb5c9"')
    await queryRunner.query('ALTER TABLE "rules" DROP COLUMN "type"')
    await queryRunner.query(
      'CREATE TYPE "public"."rules_type_enum" AS ENUM(\'expression\', \'fact\')'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD "type" "rules_type_enum" NOT NULL DEFAULT \'fact\''
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ALTER COLUMN "questionId" DROP NOT NULL'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD "operator" character varying'
    )
    await queryRunner.query('ALTER TABLE "rules" ADD "exactValue" json')
  }
}
