import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Posts1676286296829 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'posts',
            columns: [
              {
                name: 'id',
                type: 'int4',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'users_id',
                type: 'int4',
                isNullable: false,
              },
               {
                name: 'name',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'created_at',
                type: 'TIMESTAMP',
                isNullable: false,
                default: 'now()',
              },
              {
                name: 'picture',
                type: 'varchar',
                isNullable: false,
              },
            ],
          }),
        );
    
         await queryRunner.createForeignKey(
          'posts',
          new TableForeignKey({
            columnNames: ['users_id'],
            referencedTableName:'users',
            referencedColumnNames:['id'],
            onDelete: 'CASCADE',
          })
        )
    
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE posts`);
    }

}
