import { MigrationInterface, QueryRunner } from 'typeorm';

export class alterTableShClientOtpAddedEnumValue1675072048574
  implements MigrationInterface
{
  name = 'alterTableShClientOtpAddedEnumValue1675072048574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."sh_client_otp_type_enum" RENAME TO "sh_client_otp_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."sh_client_otp_type_enum" AS ENUM('login', 'forget_password', 'deactivate_user_profile', 'activate_user_profile')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" ALTER COLUMN "type" TYPE "public"."sh_client_otp_type_enum" USING "type"::"text"::"public"."sh_client_otp_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sh_client_otp_type_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sh_client_otp_type_enum_old" AS ENUM('login', 'forget_password')`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" ALTER COLUMN "type" TYPE "public"."sh_client_otp_type_enum_old" USING "type"::"text"::"public"."sh_client_otp_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."sh_client_otp_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."sh_client_otp_type_enum_old" RENAME TO "sh_client_otp_type_enum"`,
    );
  }
}
