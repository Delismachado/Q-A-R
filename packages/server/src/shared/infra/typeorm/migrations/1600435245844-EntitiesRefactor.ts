import { MigrationInterface, QueryRunner } from 'typeorm'

export class EntitiesRefactor1600435245844 implements MigrationInterface {
  name = 'EntitiesRefactor1600435245844'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"users_role_enum\" AS ENUM('admin', 'user')"
    )
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT \'user\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "questions_sets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_371d0d915380f1d88172aaed087" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      "CREATE TYPE \"questions_type_enum\" AS ENUM('true or false', 'choices', 'multiple choices', 'numeric range', 'text')"
    )
    await queryRunner.query(
      'CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "type" "questions_type_enum" NOT NULL DEFAULT \'true or false\', "options" json NOT NULL DEFAULT \'{}\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionsSetId" uuid, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "values" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "questionId" uuid, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      "CREATE TYPE \"rules_type_enum\" AS ENUM('expression', 'fact')"
    )
    await queryRunner.query(
      'CREATE TABLE "rules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exactValue" json NOT NULL, "type" "rules_type_enum" NOT NULL DEFAULT \'fact\', "operator" character varying NOT NULL, "nsleft" integer NOT NULL DEFAULT 1, "nsright" integer NOT NULL DEFAULT 2, "questionId" uuid, "parentId" uuid, CONSTRAINT "PK_10fef696a7d61140361b1b23608" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "questions" ADD CONSTRAINT "FK_f64c867892b080ab26a36a077ce" FOREIGN KEY ("questionsSetId") REFERENCES "questions_sets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "answers" ADD CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" ADD CONSTRAINT "FK_7f5bc554aedf6cbe96ca2867d39" FOREIGN KEY ("parentId") REFERENCES "rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_7f5bc554aedf6cbe96ca2867d39"'
    )
    await queryRunner.query(
      'ALTER TABLE "rules" DROP CONSTRAINT "FK_dc05da7fcb93ead823cc6065c6e"'
    )
    await queryRunner.query(
      'ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"'
    )
    await queryRunner.query(
      'ALTER TABLE "answers" DROP CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678"'
    )
    await queryRunner.query(
      'ALTER TABLE "questions" DROP CONSTRAINT "FK_f64c867892b080ab26a36a077ce"'
    )
    await queryRunner.query('DROP TABLE "rules"')
    await queryRunner.query('DROP TYPE "rules_type_enum"')
    await queryRunner.query('DROP TABLE "answers"')
    await queryRunner.query('DROP TABLE "questions"')
    await queryRunner.query('DROP TYPE "questions_type_enum"')
    await queryRunner.query('DROP TABLE "questions_sets"')
    await queryRunner.query('DROP TABLE "users"')
    await queryRunner.query('DROP TYPE "users_role_enum"')
  }
}
