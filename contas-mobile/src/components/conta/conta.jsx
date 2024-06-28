import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./conta.style.js";

const Conta = (props) => {

    return <TouchableOpacity onPress={() => props.onClick(props.id)}>
        <View style={styles.conta}>
            <View style={styles.containerIcon}>
                <Image style={styles.contaIcon}
                    source={{ uri: props.icon }}
                />
            </View>
            <View style={styles.containerCategoria}>
                <Text style={styles.contaCategoria}>{props.categoria}</Text>
                <Text style={styles.despesaDescricao}>{props.descricao} {props.parcela}</Text>
            </View>
            <View style={styles.containerValor}>
                <Text style={styles.contaValor}>
                    {Number(props.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
            </View>
        </View>
    </TouchableOpacity>
}

export default Conta;