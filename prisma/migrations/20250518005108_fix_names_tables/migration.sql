/*
  Warnings:

  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detalles_donacion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "detalles_donacion" DROP CONSTRAINT "detalles_donacion_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_donaciones" DROP CONSTRAINT "usuarios_donaciones_detalle_donacion_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_donaciones" DROP CONSTRAINT "usuarios_donaciones_usuario_id_fkey";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "detalles_donacion";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255),
    "fecha_nacimiento" DATE,
    "dni" VARCHAR(20),
    "nacionalidad" VARCHAR(100),
    "direccion" VARCHAR(255),
    "numero_direccion" VARCHAR(10),
    "celular" VARCHAR(20),
    "codigo_postal" VARCHAR(10),
    "email" VARCHAR(255) NOT NULL,
    "contrasena_hash" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_donaciones" (
    "id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER,
    "monto" DECIMAL(10,2),
    "talla" VARCHAR(50),
    "unidad_medida" VARCHAR(50),
    "fecha_vencimiento" DATE,
    "fecha_donacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detalles_donaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "detalles_donaciones" ADD CONSTRAINT "detalles_donacion_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias_donaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_donaciones" ADD CONSTRAINT "usuarios_donaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_donaciones" ADD CONSTRAINT "usuarios_donaciones_detalle_donacion_id_fkey" FOREIGN KEY ("detalle_donacion_id") REFERENCES "detalles_donaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
