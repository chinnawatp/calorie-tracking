import {MigrationInterface, QueryRunner} from "typeorm";

export class timestamp1633973504475 implements MigrationInterface {
    name = 'timestamp1633973504475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "calorieLimitPerDay" SET DEFAULT '2100'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "priceLimitPerDay" SET DEFAULT '1000'`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "takenAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "takenAt" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "food_entry" DROP COLUMN "takenAt"`);
        await queryRunner.query(`ALTER TABLE "food_entry" ADD "takenAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "priceLimitPerDay" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "calorieLimitPerDay" SET DEFAULT '0'`);
    }

}
