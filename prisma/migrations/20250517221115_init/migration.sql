-- CreateTable
CREATE TABLE "Usuario" (
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

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias_donaciones" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,

    CONSTRAINT "categorias_donaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalles_donacion" (
    "id" SERIAL NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "descripcion" TEXT,
    "cantidad" INTEGER,
    "monto" DECIMAL(10,2),
    "talla" VARCHAR(50),
    "unidad_medida" VARCHAR(50),
    "fecha_vencimiento" DATE,
    "fecha_donacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "detalles_donacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_donaciones" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "detalle_donacion_id" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_donaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_donaciones_nombre_key" ON "categorias_donaciones"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_donaciones_usuario_id_detalle_donacion_id_key" ON "usuarios_donaciones"("usuario_id", "detalle_donacion_id");

-- AddForeignKey
ALTER TABLE "detalles_donacion" ADD CONSTRAINT "detalles_donacion_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias_donaciones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_donaciones" ADD CONSTRAINT "usuarios_donaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_donaciones" ADD CONSTRAINT "usuarios_donaciones_detalle_donacion_id_fkey" FOREIGN KEY ("detalle_donacion_id") REFERENCES "detalles_donacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
