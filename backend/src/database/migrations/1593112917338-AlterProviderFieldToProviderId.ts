import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

//alterando uma coluna em uma tabela depois de ter sido criada
export default class AlterProviderFieldToProviderId1593112917338 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //trocando uma coluna por outra
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppontimentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))
  }

  //prestar atenção para na hora do drop, fazer todos os métodos ao contrário
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
    }))
  }

}
