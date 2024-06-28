import icons from "../../styles/icons.js";
import { useState } from "react";
import "./navbar.css"

const Navbar = (props) => {

    const [filtro, setFiltro] = useState("");

    return <div className="navbar">
        <img src={icons.logo} />
        <div>
            {
                props.search && <>
                    <input onChange={(e) => setFiltro(e.target.value)} type="text" id="" />
                    <button onClick={() => props.onClickSearch(filtro)} className="btn btn-blue">Buscar</button>
                </>
            }
        </div>
        <div className="dashboard">
            {
                <>
                    <div>Total de Gastos</div>
                    <div>R$ {Number(props.total).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</div>
                </>
            }
        </div>
    </div >
}

export default Navbar;