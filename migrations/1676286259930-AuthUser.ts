import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AuthUser1676286259930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'auth_users',
            columns: [
              {
                name: 'id',
                type: 'int4',
                isPrimary: true,
                isGenerated: true,
                isNullable: false,
                generationStrategy: 'increment',
              },
              {
                name: 'password',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'refresh_token',
                type: 'varchar',
                isNullable: true,
              },
            ],
          }),
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE auth_users`);
    }

}
