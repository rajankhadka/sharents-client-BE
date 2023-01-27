import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNewTableShClientOtp1674811404348 implements MigrationInterface {
  name = 'addNewTableShClientOtp1674811404348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sh_client_otp_type_enum" AS ENUM('login', 'forget_password')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sh_client_otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "otp" character varying(10) NOT NULL, "type" "public"."sh_client_otp_type_enum" NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_4d97a5505648495bbfb2ab5e63c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" ADD CONSTRAINT "FK_1fc4f2d2c1d445a032cabf19335" FOREIGN KEY ("user_id") REFERENCES "sh_client_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_otp" DROP CONSTRAINT "FK_1fc4f2d2c1d445a032cabf19335"`,
    );
    await queryRunner.query(`DROP TABLE "sh_client_otp"`);
    await queryRunner.query(`DROP TYPE "public"."sh_client_otp_type_enum"`);
  }
}
