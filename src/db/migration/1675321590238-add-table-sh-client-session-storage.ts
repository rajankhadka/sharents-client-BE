import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTableShClientSessionStorage1675321590238
  implements MigrationInterface
{
  name = 'addTableShClientSessionStorage1675321590238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sh_client_session_storage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "session_id" character varying(100) NOT NULL, "expire_at" TIMESTAMP NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ab15940ce96052dd6b1d81b946d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "sh_client_session_storage" ADD CONSTRAINT "FK_2aa93b98367400d3c314fdb748a" FOREIGN KEY ("user_id") REFERENCES "sh_client_user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sh_client_session_storage" DROP CONSTRAINT "FK_2aa93b98367400d3c314fdb748a"`,
    );
    await queryRunner.query(`DROP TABLE "sh_client_session_storage"`);
  }
}
