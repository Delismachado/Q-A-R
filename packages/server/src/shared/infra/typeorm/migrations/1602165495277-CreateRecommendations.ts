import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRecommendations1602165495277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "recomendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "projectId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da2bebfc90f32376668a1060146" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "recomendations" ADD CONSTRAINT "FK_929faa7d087f415ee9ae6ef27ad" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "recomendations" DROP CONSTRAINT "FK_929faa7d087f415ee9ae6ef27ad"'
    )
    await queryRunner.query('DROP TABLE "recomendations"')
  }
}
