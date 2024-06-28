import Sidebar from "../../components/sidebar/sidebar.jsx";
import Navbar from "../../components/navbar/navbar.jsx"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import api from "../../services/api.js";
import "./home.css";
import icons from "../../styles/icons.js";
import "react-confirm-alert/src/react-confirm-alert.css";

const Home = () => {

    const navigate = useNavigate();
    const [contas, setContas] = useState([]);
    const [total, setTotal] = useState([]);

    const ListarConta = async (busca) => {

        //acessar dados da API
        try {
            const response = await api.get("/contas", {
                params: {
                    filtroDescricao: busca
                }
            });

            setContas(response.data);

            const soma = response.data.reduce((prev, current) => {
                return prev + Number(current.valor);
            }, 0);

            setTotal(soma);

        } catch (error) {
            alert("Erro ao buscar dados");
            console.log(error);
        }
    }

    const OpenConta = (id) => {
        navigate("/contas/" + id)
    }

    const DeleteConta = (id) => {
        //teste com Alert tipo showmessage  delphi
        //alert(id)

        //deletar Conta
        try {
            confirmAlert({
                title: "Exclusão",
                message: "Confirma a exclusão da conta?",
                buttons: [{
                    label: "Sim",
                    onClick: async () => {
                        await api.delete("/contas/" + id);
                        ListarConta();
                    }
                },
                {
                    label: "Não",
                    onClick: () => { }
                }]
            })

        } catch (error) {
            alert("Erro ao excluir a conta");
            console.log(error);
        }
    }

    useEffect(() => {
        ListarConta();
    }, []);

    return <>
        <Sidebar />
        <Navbar onClickSearch={ListarConta}
            total={total}
            search={true} />
        <div className="container-home">
            <div className="title-home">
                <h1>Contas à Receber</h1>
                <button onClick={() => navigate("/contas/add")} className="btn btn-green"> Adicionar Conta</button>
            </div>
            <div className="box-conta">
                <table>
                    <thead>
                        <tr>
                            <th>Id. Conta</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                            <th className="text-center">Parcela</th>
                            <th className="text-center">Data Vencimento</th>
                            <th className="text-center">Data Pagamento</th>
                            <th className="text-right">Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contas.map((cont) => {
                                return <tr>
                                    <td>{cont.id}</td>
                                    <td>{cont.descricao}</td>
                                    <td>
                                        <div>
                                            <img className="icon-sm" src={cont.categoriaDetalhe.icon} />
                                            <span className="ml-10"> {cont.categoria}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">{cont.parcela}</td>
                                    <td className="text-center">{new Date(cont.DataVencimento).toLocaleDateString('pt-br')}</td>
                                    <td className="text-center">{new Date(cont.DataPagamento).toLocaleDateString('pt-br')}</td>
                                    {/*https://www.freecodecamp.org/portuguese/news/formatacao-de-datas-em-javascript-com-uma-linha-de-codigo/  site formatação da data */}

                                    <td className="text-right">
                                        R$ {Number(cont.valor).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="text-right">
                                        <button onClick={() => OpenConta(cont.id)}
                                            className="btn btn-blue">
                                            <img className="icon-sm" src={icons.edit}></img>
                                        </button>
                                        <button onClick={() => DeleteConta(cont.id)}
                                            className="btn btn-red ml-10">
                                            <img className="icon-sm" src={icons.remove}></img>
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>


                </table>
                {
                    contas.length == 0 && <div className="empty-conta">
                        <img src={icons.empty} />
                        <p>Nenhuma contaa econtrada</p>
                    </div>
                }
            </div>
        </div>

    </>
}

export default Home;