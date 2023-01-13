import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableRefreshTokenAddedColumnIdentificationSetNotNull1673582938151
  implements MigrationInterface
{
  name =
    'alterTableRefreshTokenAddedColumnIdentificationSetNotNull1673582938151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_refresh_token" ADD "identification" character varying(70) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_refresh_token" DROP COLUMN "identification"`,
    );
  }
}
