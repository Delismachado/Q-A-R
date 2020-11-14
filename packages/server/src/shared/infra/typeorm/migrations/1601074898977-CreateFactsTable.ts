import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFactsTable1601074898977 implements MigrationInterface {
  name = 'CreateFactsTable1601074898977'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "facts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" uuid, CONSTRAINT "PK_b35218a44dc3d5dd2f0f54d7e3f" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "facts" ADD CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "facts" DROP CONSTRAINT "FK_2b4a9b26e3b27ea5b7f0761ea70"'
    )
    await queryRunner.query('DROP TABLE "facts"')
  }
}
