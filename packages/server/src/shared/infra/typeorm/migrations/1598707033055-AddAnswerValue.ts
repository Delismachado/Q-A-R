import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddAnswerValue1598707033055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('answers', 'value')
    await queryRunner.addColumn(
      'answers',
      new TableColumn({
        name: 'values',
        type: 'json',
        isNullable: false,
        default: "'{}'"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'answers',
      new TableColumn({
        name: 'value',
        type: 'boolean'
      })
    )
    await queryRunner.dropColumn('answers', 'values')
  }
}
