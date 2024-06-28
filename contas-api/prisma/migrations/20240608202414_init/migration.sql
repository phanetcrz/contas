-- CreateTable
CREATE TABLE "categorias" (
    "categoria" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("categoria")
);

-- CreateTable
CREATE TABLE "contas" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "parcela" TEXT,
    "DataVencimento" TEXT,
    "DataPagamento" TEXT,

    CONSTRAINT "contas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contas" ADD CONSTRAINT "contas_categoria_fkey" FOREIGN KEY ("categoria") REFERENCES "categorias"("categoria") ON DELETE RESTRICT ON UPDATE CASCADE;
