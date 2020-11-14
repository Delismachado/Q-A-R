import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddsNewFactTypes1601767949884 implements MigrationInterface {
  name = 'AddsNewFactTypes1601767949884'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "facts" ADD "value" character varying')
    await queryRunner.query('ALTER TABLE "facts" ADD "begin" integer')
    await queryRunner.query('ALTER TABLE "facts" ADD "end" integer')
    await queryRunner.query(
      'ALTER TABLE "facts" ADD "type" character varying NOT NULL'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_cd8d1966b9d8cd94dc80cf0303" ON "facts" ("type") '
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX "IDX_cd8d1966b9d8cd94dc80cf0303"')
    await queryRunner.query('ALTER TABLE "facts" DROP COLUMN "type"')
    await queryRunner.query('ALTER TABLE "facts" DROP COLUMN "end"')
    await queryRunner.query('ALTER TABLE "facts" DROP COLUMN "begin"')
    await queryRunner.query('ALTER TABLE "facts" DROP COLUMN "value"')
  }
}
