import prismaClient from "../services/database.js";

/* configuração para usar o método assíncrono */
const Listar = async (request, response) => {

    const cat = await prismaClient.categoria.findMany();

    return response.json(cat);
}

const Inserir = async (request, response) => {

    try {
        const { categoria, icon } = request.body;       /* recebe os dados através do corpo da requisição e alimenta as variaveis */

        const cat = await prismaClient.categoria.create({            /* salva no banco de dados*/
            data: {
                categoria: categoria,
                icon: icon
            }
        })

        return response.status(201).json(cat);
    } catch (error) {
        return response.status(500).send(error);
    }
}


export default { Listar, Inserir };