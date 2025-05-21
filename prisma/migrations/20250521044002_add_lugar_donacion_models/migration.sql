/*
  Warnings:

  - You are about to drop the `categorias_donaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detalles_donaciones` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios_donaciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "detalles_donaciones" DROP CONSTRAINT "detalles_donacion_categoria_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_donaciones" DROP CONSTRAINT "usuarios_donaciones_detalle_donacion_id_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_donaciones" DROP CONSTRAINT "usuarios_donaciones_usuario_id_fkey";

-- DropTable
DROP TABLE "categorias_donaciones";

-- DropTable
DROP TABLE "detalles_donaciones";

-- DropTable
DROP TABLE "usuarios_donaciones";

-- CreateTable
CREATE TABLE "cat_don" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "cat_don_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "det_don" (
    "id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER,
    "monto" DECIMAL(10,2),
    "talla" VARCHAR(50),
    "unidad_medida" VARCHAR(50),
    "fecha_vencimiento" DATE,
    "fecha_donacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "det_don_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usr_don" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "detalle_donacion_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usr_don_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lug_don" (
    "id" SERIAL NOT NULL,
    "nombre_institucion" VARCHAR(255) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "codigo_postal" VARCHAR(10),
    "telefono_contacto" VARCHAR(20),
    "latitud" DECIMAL(10,8),
    "longitud" DECIMAL(11,8),

    CONSTRAINT "lug_don_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" SERIAL NOT NULL,
    "lugar_donacion_id" INTEGER NOT NULL,
    "diaSemana" VARCHAR(20) NOT NULL,
    "horaInicio" VARCHAR(5) NOT NULL,
    "horaFin" VARCHAR(5) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "u_l_don" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "lugar_donacion_id" INTEGER NOT NULL,
    "fecha_hora_donacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "u_l_don_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cat_don_nombre_key" ON "cat_don"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usr_don_usuario_id_detalle_donacion_id_key" ON "usr_don"("usuario_id", "detalle_donacion_id");

-- AddForeignKey
ALTER TABLE "det_don" ADD CONSTRAINT "detalles_donacion_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "cat_don"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usr_don" ADD CONSTRAINT "usuarios_donaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usr_don" ADD CONSTRAINT "usuarios_donaciones_detalle_donacion_id_fkey" FOREIGN KEY ("detalle_donacion_id") REFERENCES "det_don"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_lugar_donacion_id_fkey" FOREIGN KEY ("lugar_donacion_id") REFERENCES "lug_don"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_l_don" ADD CONSTRAINT "u_l_don_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "u_l_don" ADD CONSTRAINT "u_l_don_lugar_donacion_id_fkey" FOREIGN KEY ("lugar_donacion_id") REFERENCES "lug_don"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
