import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateParticipation1604336272674 implements MigrationInterface {
  name = 'CreateParticipation1604336272674'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "participations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "projectId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7aa63b8dcd3d6f8aef8a98bb14a" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'ALTER TABLE "participations" ADD CONSTRAINT "FK_6c63f267118be4a8365c98bea95" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "participations" ADD CONSTRAINT "FK_b96d1e076744a3081adbb791c48" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "participations" DROP CONSTRAINT "FK_b96d1e076744a3081adbb791c48"'
    )
    await queryRunner.query(
      'ALTER TABLE "participations" DROP CONSTRAINT "FK_6c63f267118be4a8365c98bea95"'
    )
    await queryRunner.query('DROP TABLE "participations"')
  }
}
