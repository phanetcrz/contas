import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import api from "../../services/api";
import "./cad-conta.css";

const CadConta = () => {

    const { idUrl } = useParams();
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("Ledware");
    const [parcela, setParcela] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [dataPagamento, setDataPagamento] = useState();
    const navigate = useNavigate();

    const SalvarDados = async () => {
        try {
            if (idUrl != "add") { //--Edição
                await api.put("/contas/" + idUrl, {
                    descricao: descricao,                  //Passa as variaveis de estado no corpo da requisição
                    valor: valor,
                    categoria: categoria,
                    parcela: parcela,
                    DataVencimento: dataVencimento,
                    DataPagamento: dataPagamento
                })

            } else {
                await api.post("/contas", {
                    descricao: descricao,                  //Passa as variaveis de estado no corpo da requisição
                    valor: valor,
                    categoria: categoria,
                    parcela: parcela,
                    DataVencimento: dataVencimento,
                    DataPagamento: dataPagamento
                });
            }

            navigate("/");

        } catch (error) {
            alert("Erro ao salvar dados");
            console.log(error);
        }
        /*teste salvar
        console.log(valor);
        console.log(descricao);
        console.log(categoria);*/
    }

    const GetDadosConta = async (id) => {
        try {
            //faz o GET na API...
            const response = await api.get("/contas/" + id);

            console.log(response.data.DataVencimento);

            setValor(response.data.valor);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
            setParcela(response.data.parcela);
            setDataVencimento(response.data.DataVencimento);
            setDataPagamento(response.data.DataPagamento);

        } catch (error) {
            alert("Erro ao buscar dados");
            console.log(error);
        }
    }

    useEffect(() => {
        if (idUrl != "add") {
            GetDadosConta(idUrl);
        }

    }, []);
    return <div>
        <Sidebar />
        <Navbar />
        <div className="container-conta-cad">
            <div className="box-conta-cad">
                {
                    idUrl == "add" ? <h1>Nova Conta</h1> : <h1>Editar Conta</h1>  /* "?"" = então e ":" = else*/
                }
                <div className="input-group">
                    <p>Valor</p>
                    <input type="text" className="input-lg w100" id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Descrição</p>
                    <input type="text" className="w100" id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Parcela</p>
                    <input type="text" className="w100" id="descricao"
                        placeholder="Ex: 1/10"
                        value={parcela}
                        onChange={(e) => setParcela(e.target.value)} />
                </div>

                <div className="input-group datetime">
                    <p>Data Vencimento</p>
                    <input type="date" className="w100" id="date"
                        Value={dataVencimento}
                        onChange={(e) => setDataVencimento(e.target.value)} />
                </div>

                <div className="input-group datetime">
                    <p>Data Pagamento</p>
                    <input type="date" className="w100" id="date"
                        Value={dataPagamento}
                        onChange={(e) => setDataPagamento(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Categoria</p>
                    <select id="categoria" className="w100"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}>
                        <option value="Ledware">Ledware</option>
                        <option value="Ações">Ações</option>
                        <option value="Fundo Imobiliário">Fundo Imobiliário</option>
                        <option value="Renda Fixa">Renda Fixa</option>
                    </select>
                </div>

                <div className="btn-group text-right">
                    <button onClick={() => navigate("/")} className="btn btn-blue-outline">Cancelar </button>
                    <button onClick={SalvarDados} className="btn btn-blue ml-20">Salvar </button>
                </div>

            </div>

        </div>
    </div>
}

export default CadConta;