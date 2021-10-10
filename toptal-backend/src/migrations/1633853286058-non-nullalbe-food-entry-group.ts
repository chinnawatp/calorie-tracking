import {MigrationInterface, QueryRunner} from "typeorm";

export class nonNullalbeFoodEntryGroup1633853286058 implements MigrationInterface {
    name = 'nonNullalbeFoodEntryGroup1633853286058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry_group" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP CONSTRAINT "FK_7451e483e386edb46adca2af113"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ALTER COLUMN "foodEntryGroupId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD CONSTRAINT "FK_7451e483e386edb46adca2af113" FOREIGN KEY ("foodEntryGroupId") REFERENCES "food_entry_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry" DROP CONSTRAINT "FK_7451e483e386edb46adca2af113"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ALTER COLUMN "foodEntryGroupId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD CONSTRAINT "FK_7451e483e386edb46adca2af113" FOREIGN KEY ("foodEntryGroupId") REFERENCES "food_entry_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "food_entry_group" DROP COLUMN "date"`);
    }

}
