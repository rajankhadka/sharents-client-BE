import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNewTableShClientPasswordAndAddedCloumnIsverifyOnShClientOtpTable1675052228560
  implements MigrationInterface
{
  name =
    'addNewTableShClientPasswordAndAddedCloumnIsverifyOnShClientOtpTable1675052228560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sh_client_password_remark_enum" AS ENUM('forget_password', 'change_password')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sh_client_password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "remark" "public"."sh_client_password_remark_enum" NOT NULL, "password" character varying(400) NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_f9a36e1c7d6317f4eed682d33a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" ADD "is_verify" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_password" ADD CONSTRAINT "FK_952313aa212b712c69c9bda3446" FOREIGN KEY ("user_id") REFERENCES "sh_client_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_password" DROP CONSTRAINT "FK_952313aa212b712c69c9bda3446"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" DROP COLUMN "is_verify"`,
    );
    await queryRunner.query(`DROP TABLE "sh_client_password"`);
    await queryRunner.query(
      `DROP TYPE "public"."sh_client_password_remark_enum"`,
    );
  }
}
