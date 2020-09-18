import {MigrationInterface, QueryRunner} from "typeorm";

export class Refactor1600438855512 implements MigrationInterface {
    name = 'Refactor1600438855512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rules" ALTER COLUMN "exactValue" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rules" ALTER COLUMN "operator" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rules" ALTER COLUMN "operator" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rules" ALTER COLUMN "exactValue" SET NOT NULL`);
    }

}
