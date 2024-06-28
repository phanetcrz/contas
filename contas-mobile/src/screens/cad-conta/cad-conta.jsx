import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { styles } from "./cad-conta.style.js"
import icons from "../../constants/icons.js";
import api from "../../services/api.js";
import { Picker } from '@react-native-picker/picker';

/*
fazer testes
https://www.npmjs.com/package/react-native-mask-input
*/



const CadConta = (props) => {

    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("Ledware");
    const [parcela, setParcela] = useState("");
    const [dataVencimento, setDataVencimento] = useState("");
    const [dataPagamento, setDataPagamento] = useState("");

    const handleSalvar = async () => {
        // Salvar a despesa na API...

        try {
            if (props.route.params.id > 0) {
                await api.put("/contas/" + props.route.params.id, {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor,
                    parcela: parcela,
                    DataVencimento: dataVencimento,
                    DataPagamento: dataPagamento
                });
            } else {
                await api.post("/contas", {
                    descricao: descricao,
                    categoria: categoria,
                    valor: valor,
                    parcela: parcela,
                    DataVencimento: dataVencimento,
                    DataPagamento: dataPagamento
                });
            }

            props.navigation.navigate("home");

        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao salvar dados");
        }
    };

    const handleExcluir = () => {
        // Excluir a despesa na API...
        try {
            Alert.alert('Exclusão', 'Confirma a exclusão da conta?', [{
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Sim', onPress: async () => {
                    await api.delete("/contas/" + props.route.params.id);
                    props.navigation.navigate("home");
                }
            },
            ]);
        } catch (error) {
            console.log(error);
            Alert.alert("Erro ao excluir a conta");
        }
    };

    const DadosConta = async (id) => {
        try {
            /*via axios acessando a API    */
            const response = await api.get("/contas/" + id);

            setDescricao(response.data.descricao)
            setValor(response.data.valor)
            setCategoria(response.data.categoria)
            setParcela(response.data.parcela)
            setDataVencimento(response.data.DataVencimento)
            setDataPagamento(response.data.DataPagamento)

        } catch (error) {
            console.log(error)
            Alert.alert("Erro ao buscar dados da cota")
        }
    };

    useEffect(() => {
        props.navigation.setOptions({   //-- Altera o Texto do header do Stack.Screen  no navigation container
            title: props.route.params.id > 0 ? "Editar Conta" : "Nova Conta"
        });

        // buscar dados da despesa na API
        if (props.route.params.id > 0) {
            DadosConta(props.route.params.id);
        }

    }, [])

    return <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Valor</Text>
                <TextInput placeholder="0,00"
                    style={styles.inputValor}
                    defaultValue={valor.toString()}
                    keyboardType="decimal-pad"
                    onChangeText={(texto) => setValor(texto)} />
            </View>

            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Descrição</Text>
                <TextInput placeholder="Ex: Aluguel"
                    style={styles.inputText}
                    defaultValue={descricao}
                    onChangeText={(texto) => setDescricao(texto)} />
            </View>

            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Parcela</Text>
                <TextInput placeholder="Ex: 1/10"
                    style={styles.inputText}
                    defaultValue={parcela}
                    onChangeText={(texto) => setParcela(texto)} />
            </View>

            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Data Vencimento</Text>
                <TextInput placeholder="DD/MM/YYYY"
                    style={styles.inputText}
                    defaultValue={dataVencimento}
                    onChangeText={(texto) => setDataVencimento(texto)} />
            </View>

            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Data Pagamento</Text>
                <TextInput placeholder="DD/MM/YYYY"
                    style={styles.inputText}
                    defaultValue={dataPagamento}
                    onChangeText={(texto) => setDataPagamento(texto)} />
            </View>

            <View style={styles.containerField}>
                <Text style={styles.inputLabel}>Categoria</Text>
                <View style={styles.inputPicker}>
                    <Picker selectedValue={categoria}
                        onValueChange={(itemValue, itemIndex) => {
                            setCategoria(itemValue);
                        }} >
                        <Picker.Item label="Ledware" value="Ledware" />
                        <Picker.Item label="Ações" value="Ações" />
                        <Picker.Item label="Fundo Imobiliário" value="Fundo Imobiliário" />
                        <Picker.Item label="Renda Fixa" value="Renda Fixa" itemStyle={{ padding: 0 }} />
                    </Picker>
                </View>
            </View>

            <View style={styles.containerBtn}>
                <TouchableOpacity style={styles.btn} onPress={handleSalvar}>
                    <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerDelete}>
                <TouchableOpacity onPress={handleExcluir}>
                    <Image source={icons.remove} style={styles.btnDelete} />
                </TouchableOpacity>
            </View>
        </ScrollView>

    </View>;
}

export default CadConta;