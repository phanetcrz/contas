import prismaClient from "../services/database.js";

const Listar = async (request, response) => {

    const config = {
        include: {                  ///include é utilizado para fazer relaciomento com outras tabelas - 
            categoriaDetalhe: true  // o categoriaDetalhe está no schema.prisma
        },
        orderBy: {
            id: "desc"
        }
    };

    if (request.query.filtroDescricao) {
        config.where = {
            descricao: {
                contains: request.query.filtroDescricao,
                mode: 'insensitive'
            },
        }
    }

    const desp = await prismaClient.conta.findMany(config);

    return response.json(desp);

}

const ListarId = async (request, response) => {

    const config = {
        include: {                  ///include é utilizado para fazer relaciomento com outras tabelas - 
            categoriaDetalhe: true  // o categoriaDetalhe está no schema.prisma
        },
        where: {
            id: Number(request.params.id) /* acessar o parametro da requisição na url*/
        }
    }

    const desp = await prismaClient.conta.findMany(config);

    return response.json(desp[0]);  //Quando o retorno no json é de apenas um elemento, então não precisa retornar com [ ], que significa um array

}

const Inserir = async (request, response) => {

    try {
        const { descricao, categoria, valor, parcela, DataVencimento, DataPagamento } = request.body;       /* recebe os dados através do corpo da requisição e alimenta as variaveis */

        const desp = await prismaClient.conta.create({            /* salva no banco de dados*/
            data: {
                descricao: descricao,
                categoria: categoria,
                valor: valor,
                parcela: parcela,
                DataVencimento: DataVencimento,
                DataPagamento: DataPagamento
            }
        })

        return response.status(201).json(desp);
    } catch (error) {
        return response.status(500).send(error);
    }
}

const Editar = async (request, response) => {
    try {
        const { descricao, categoria, valor, parcela, DataVencimento, DataPagamento } = request.body;       /* recebe os dados através do corpo da requisição e alimenta as variaveis */

        const id = request.params.id; /* acessar o parametro da requisição na url*/

        const desp = await prismaClient.conta.update({            /* Atualiza os dados no banco de dados*/
            where: {                                                /* aqui entra a condição,que no caso é o id.*/
                id: Number(id)
            },

            data: {
                descricao: descricao,
                categoria: categoria,
                valor: valor,
                parcela: parcela,
                DataVencimento: DataVencimento,
                DataPagamento: DataPagamento
            }
        })

        return response.json(desp);
    } catch (error) {
        return response.status(500).send(error);
    }
}

const Deletar = async (request, response) => {
    try {
        const id = request.params.id; /* acessar o parametro da requisição na url*/

        const desp = await prismaClient.conta.delete({            /* deleta os dados no banco de dados*/
            where: {                                                /* aqui entra a condição,que no caso é o id.*/
                id: Number(id)
            }
        })

        return response.json(desp);
    } catch (error) {
        return response.status(500).send(error);
    }
}

export default { Listar, ListarId, Inserir, Editar, Deletar };