import {MigrationInterface, QueryRunner} from "typeorm";

export class addLimitPerDay1633875212702 implements MigrationInterface {
    name = 'addLimitPerDay1633875212702'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "calorieLimitPerDay" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "priceLimitPerDay" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "priceLimitPerDay"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "calorieLimitPerDay"`);
    }

}
