import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameRecommendations1602166234976 implements MigrationInterface {
  name = 'RenameRecommendations1602166234976'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recomendations')
    await queryRunner.query(
      'CREATE TABLE "recommendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "projectId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_23a8d2db26db8cabb6ae9d6cd87" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "recommendations" ADD CONSTRAINT "FK_1f2721d7345a1c16546a8c60f46" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "recommendations" DROP CONSTRAINT "FK_1f2721d7345a1c16546a8c60f46"'
    )
    await queryRunner.query('DROP TABLE "recommendations"')
    await queryRunner.query(
      'CREATE TABLE "recomendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "projectId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da2bebfc90f32376668a1060146" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "recomendations" ADD CONSTRAINT "FK_929faa7d087f415ee9ae6ef27ad" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }
}
