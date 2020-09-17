import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm'

export class AddExpressionDataToRules1600378628974
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('rules', [
      new TableColumn({
        name: 'ruleType',
        isNullable: false,
        type: 'varchar'
      }),
      new TableColumn({
        name: 'operator',
        isNullable: true,
        type: 'varchar'
      }),
      new TableColumn({
        name: 'operand1Id',
        isNullable: true,
        type: 'uuid'
      }),
      new TableColumn({
        name: 'operand2Id',
        isNullable: true,
        type: 'uuid'
      })
    ])
    await queryRunner.createForeignKeys('rules', [
      new TableForeignKey({
        name: 'RulesOperand1ForeignKey',
        columnNames: ['operand1Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rules',
        onDelete: 'NO ACTION'
      }),

      new TableForeignKey({
        name: 'RulesOperand2ForeignKey',
        columnNames: ['operand2Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rules',
        onDelete: 'NO ACTION'
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rules', 'RulesOperand1ForeignKey')
    await queryRunner.dropForeignKey('rules', 'RulesOperand2ForeignKey')
    await queryRunner.dropColumns('rules', [
      new TableColumn({
        name: 'ruleType',
        type: 'varchar'
      }),
      new TableColumn({
        name: 'operator',
        type: 'varchar'
      }),
      new TableColumn({
        name: 'operand1Id',
        type: 'uuid'
      }),
      new TableColumn({
        name: 'operand2Id',
        type: 'uuid'
      })
    ])
  }
}
