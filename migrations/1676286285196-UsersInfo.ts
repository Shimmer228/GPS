import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class UsersInfo1676286285196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void>  {
        await queryRunner.createTable(
          new Table({
            name: 'users',
            columns: [
              {
                name: 'id',
                type: 'int4',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
               {
                name: 'auth_user_id',
                type: 'int4',
                isNullable: false,
              },
              {
                name: 'email',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'phone',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'username',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'country',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'role',
                type: 'varchar',
                isNullable: false,
                default: "user"
              },
              {
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
              },
              {
                name: 'created_at',
                type: 'TIMESTAMP',
                isNullable: false,
                default: 'now()',
              },
    
            ],
          }),
        );
        await queryRunner.createForeignKey(
          'users',
          new TableForeignKey({
            columnNames: ['auth_user_id'],
            referencedTableName:'auth_users',
            referencedColumnNames:['id'],
            onDelete: 'CASCADE',
          })
        )
    
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE users`);
    }

}
