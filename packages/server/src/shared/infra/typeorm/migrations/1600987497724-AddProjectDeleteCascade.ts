import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddProjectDeleteCascade1600987497724
  implements MigrationInterface {
  name = 'AddProjectDeleteCascade1600987497724'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "questions" DROP CONSTRAINT "FK_f64c867892b080ab26a36a077ce"'
    )
    await queryRunner.query(
      'ALTER TABLE "questions" RENAME COLUMN "questionsSetId" TO "projectId"'
    )
    await queryRunner.query(
      'CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "questions" ADD CONSTRAINT "FK_93c47dbe62b46340c29120ef83c" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "questions" DROP CONSTRAINT "FK_93c47dbe62b46340c29120ef83c"'
    )
    await queryRunner.query('DROP TABLE "projects"')
    await queryRunner.query(
      'ALTER TABLE "questions" RENAME COLUMN "projectId" TO "questionsSetId"'
    )
    await queryRunner.query(
      'ALTER TABLE "questions" ADD CONSTRAINT "FK_f64c867892b080ab26a36a077ce" FOREIGN KEY ("questionsSetId") REFERENCES "questions_sets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }
}
