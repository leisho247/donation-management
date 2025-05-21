-- AlterTable
ALTER TABLE "lug_don" ADD COLUMN     "localidad" VARCHAR(100),
ADD COLUMN     "provincia" VARCHAR(100);

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "localidad" VARCHAR(100),
ADD COLUMN     "provincia" VARCHAR(100);
