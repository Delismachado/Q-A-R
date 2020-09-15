import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export class AddQuestionSetToQuestions1600126587194
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'questions',
      new TableColumn({
        name: 'questionsSetId',
        isNullable: true,
        type: 'uuid'
      })
    )
    await queryRunner.createForeignKey(
      'questions',
      new TableForeignKey({
        columnNames: ['questionsSetId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'questions_sets',
        onDelete: 'CASCADE'
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('questions')
    if (!table) throw new Error('table questions not found')
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('questionsSetId') !== -1
    )
    if (!foreignKey) throw new Error('foreignKey not found')
    await queryRunner.dropForeignKey('questions', foreignKey)
    await queryRunner.dropColumn('questions', 'questionsSetId')
  }
}
