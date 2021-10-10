import {MigrationInterface, QueryRunner} from "typeorm";

export class addMenuNameToFoodEntry1633852563516 implements MigrationInterface {
    name = 'addMenuNameToFoodEntry1633852563516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "menuName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "takenAt" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "takenAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "menuName"`);
    }

}
