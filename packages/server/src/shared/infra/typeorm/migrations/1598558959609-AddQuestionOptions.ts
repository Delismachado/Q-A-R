import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddQuestionOptions1598558959609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'questions',
      new TableColumn({
        name: 'options',
        type: 'json',
        isNullable: false,
        default: "'{}'"
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('questions', 'options')
  }
}
