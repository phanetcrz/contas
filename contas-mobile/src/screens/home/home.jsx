import { useCallback, useEffect, useState } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./home.style.js";
import icons from "../../constants/icons.js"
import global from "../../global.js"
import Conta from "../../components/conta/conta.jsx";
import api from "../../services/api.js";
import { useFocusEffect } from "@react-navigation/native";

const Home = (props) => {

    const [total, setTotal] = useState(0);
    const [contas, setContas] = useState([])

    const OpenContas = (id) => {
        props.navigation.navigate("conta", {   //aqui chama a tela de despesa em modo edição passando o id despesa
            id: id
        });
    }

    const ListarContas = async () => {

        try {
            const response = await api.get("/contas");
            setContas(response.data);

            // Calcula a soma das despesas
            const soma = response.data.reduce((prev, current) => {
                return prev + Number(current.valor);
            }, 0);

            setTotal(soma);
        } catch (error) {
            console.log(error);
        }
    }

    /*    useEffect(() => {
            ListarContas();
        }, []);*/

    useFocusEffect(useCallback(() => {
        ListarContas();
    }, []));

    return <View style={styles.container}>
        <Image source={icons.logo} style={styles.logo} />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={styles.dashboard}>
                    <View>
                        <Text style={styles.dashboardValor}>
                            R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </Text>
                        <Text style={styles.dashboardTotal}>Total à receber no período</Text>
                    </View>
                    <Image style={styles.dashboardImg} source={icons.money} />
                </View>
            </View>
            <View>
                <Text style={styles.despesasTitulo}>Contas a Receber de: {global.MesAno()}</Text>

                {
                    contas.map((conta) => {
                        return <Conta key={conta.id}
                            id={conta.id}
                            icon={conta.categoriaDetalhe.icon}
                            categoria={conta.categoria}
                            descricao={conta.descricao}
                            parcela={conta.parcela}
                            dataVencimento={conta.dataVencimento}
                            dataPagamento={conta.dataPagamento}
                            valor={conta.valor}

                            onClick={OpenContas}
                        />
                    })
                }

            </View>
        </ScrollView>
        <TouchableOpacity style={styles.btnAdd} onPress={() => OpenContas(0)}>
            <Image source={icons.add} style={styles.btnAddImage} />
        </TouchableOpacity>

    </View>
}

export default Home;