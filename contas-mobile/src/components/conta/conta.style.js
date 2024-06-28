import { COLORS, FONT_SIZE } from "../../constants/theme.js"

export const styles = {
    conta: {
        width: "100%",
        backgroundColor: COLORS.gray,
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },    
    containerIcon: {
        flex: 3
    },
    contaIcon: {
        width: 35,
        height: 35
    },
    containerCategoria: {
        flex: 10
    },
    containerValor: {
        flex: 4
    },
    contaCategoria: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
        fontWeight: "bold"
    },
    contaDescricao: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
    },
    contaValor: {
        fontSize: FONT_SIZE.sm,
        color: COLORS.dark_gray,
        fontWeight: "bold",
        textAlign: "right"
    }    
}