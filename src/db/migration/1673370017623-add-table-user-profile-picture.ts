import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTableUserProfilePicture1673370017623
  implements MigrationInterface
{
  name = 'addTableUserProfilePicture1673370017623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sh_client_user_profile_picture" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "file_name" character varying(100) NOT NULL, "file_path" character varying(500) NOT NULL, "file_size" integer NOT NULL, "file_type" character varying(100) NOT NULL, "user_profile_id" uuid, CONSTRAINT "PK_df66e01f7590c4b1b4515f2302d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_user_profile_picture" ADD CONSTRAINT "FK_4bfd8fd30e1a41c078e6b26566a" FOREIGN KEY ("user_profile_id") REFERENCES "sh_client_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_user_profile_picture" DROP CONSTRAINT "FK_4bfd8fd30e1a41c078e6b26566a"`,
    );
    await queryRunner.query(`DROP TABLE "sh_client_user_profile_picture"`);
  }
}
