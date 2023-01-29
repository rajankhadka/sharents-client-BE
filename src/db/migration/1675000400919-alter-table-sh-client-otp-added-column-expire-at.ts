import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableShClientOtpAddedColumnExpireAt1675000400919
  implements MigrationInterface
{
  name = 'alterTableShClientOtpAddedColumnExpireAt1675000400919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" ADD "expire_at" TIMESTAMP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" DROP COLUMN "expire_at"`,
    );
  }
}
