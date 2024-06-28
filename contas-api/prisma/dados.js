import prismaClient from "../src/services/database.js";

const dadosCategorias = [
    {
        categoria: "Ledware",
        icon: "https://jornada-js-despesas.s3.sa-east-1.amazonaws.com/logoLedware.png"
    },
    {
        categoria: "Ações",
        icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-casa.png"
    },
    {
        categoria: "Fundo Imobiliário",
        icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-lazer.png"
    },
    {
        categoria: "Renda Fixa",
        icon: "https://jornadajs-devpoint.s3.amazonaws.com/icon-mercado.png"
    }
];


const CarregarDados = async () => {

    try {
        await prismaClient.categoria.createMany({
            data: dadosCategorias
        });
        console.log("Carga finalizada")
    } catch (error) {
        console.log("Erro na carga:");
        console.log(error);
    }

}


CarregarDados();