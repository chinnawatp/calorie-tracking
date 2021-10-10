import {MigrationInterface, QueryRunner} from "typeorm";

export class addEntities1633842109086 implements MigrationInterface {
    name = 'addEntities1633842109086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food_entry" ("id" SERIAL NOT NULL, "calorie" integer NOT NULL, "price" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "foodEntryGroupId" integer, "userId" integer, CONSTRAINT "PK_8fb8473c98ef0a33c9b3a64f498" PRIMARY KEY ("id")); COMMENT ON COLUMN "food_entry"."price" IS 'Storing in smallest unit'`);
        await queryRunner.query(`CREATE TABLE "food_entry_group" ("id" SERIAL NOT NULL, "calorie" integer NOT NULL, "price" integer NOT NULL, "userId" integer, CONSTRAINT "PK_79be39b39db4bbb475bc99114a3" PRIMARY KEY ("id")); COMMENT ON COLUMN "food_entry_group"."price" IS 'Storing in smallest unit'`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD CONSTRAINT "FK_7451e483e386edb46adca2af113" FOREIGN KEY ("foodEntryGroupId") REFERENCES "food_entry_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD CONSTRAINT "FK_6a6643aafaf34177a6857154fdd" FOREIGN KEY ("userId") REFERENCES "food_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_entry_group" ADD CONSTRAINT "FK_88092b404cd1b98aeb8dc5dc15b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry_group" DROP CONSTRAINT "FK_88092b404cd1b98aeb8dc5dc15b"`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP CONSTRAINT "FK_6a6643aafaf34177a6857154fdd"`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP CONSTRAINT "FK_7451e483e386edb46adca2af113"`);
        await queryRunner.query(`DROP TABLE "food_entry_group"`);
        await queryRunner.query(`DROP TABLE "food_entry"`);
    }

}
