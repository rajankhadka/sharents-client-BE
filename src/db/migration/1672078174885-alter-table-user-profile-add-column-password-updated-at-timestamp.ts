import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableUserProfileAddColumnPasswordUpdatedAtTimestamp1672078174885
  implements MigrationInterface
{
  name =
    'alterTableUserProfileAddColumnPasswordUpdatedAtTimestamp1672078174885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_user_profile" ADD "password_updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_user_profile" DROP COLUMN "password_updated_at"`,
    );
  }
}
