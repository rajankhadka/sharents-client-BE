import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTableRefreshToken1672152159144 implements MigrationInterface {
  name = 'addTableRefreshToken1672152159144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sh_client_refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_051cb8334013577cc5c864d317d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_refresh_token" ADD CONSTRAINT "FK_46c1f19d7b0c1df89fcdbf01085" FOREIGN KEY ("user_id") REFERENCES "sh_client_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_refresh_token" DROP CONSTRAINT "FK_46c1f19d7b0c1df89fcdbf01085"`,
    );
    await queryRunner.query(`DROP TABLE "sh_client_refresh_token"`);
  }
}
