import {MigrationInterface, QueryRunner} from "typeorm";

export class addShClientUserProfileTable1672032808230 implements MigrationInterface {
    name = 'addShClientUserProfileTable1672032808230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sh_client_user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, "is_deleted" boolean NOT NULL DEFAULT false, "created_by" uuid, "updated_by" uuid, "first_name" character varying(50) NOT NULL, "middle_name" character varying(50), "last_name" character varying(50) NOT NULL, "user_name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "phone_number" character varying(50) NOT NULL, "password" character varying(400) NOT NULL, CONSTRAINT "UQ_0c349083164247e10b606fe2cb5" UNIQUE ("user_name"), CONSTRAINT "PK_738a49fbf5f7bc596479827f5da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_profile_phone_number_unique_index" ON "sh_client_user_profile" ("phone_number") WHERE (is_deleted is false)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "user_profile_email_unique_index" ON "sh_client_user_profile" ("email") WHERE (is_deleted is false)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_profile_email_unique_index"`);
        await queryRunner.query(`DROP INDEX "public"."user_profile_phone_number_unique_index"`);
        await queryRunner.query(`DROP TABLE "sh_client_user_profile"`);
    }

}
