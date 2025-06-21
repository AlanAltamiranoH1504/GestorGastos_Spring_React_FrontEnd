import {Link} from "react-router-dom";

const Navegacion = () => {
    return (
        <>
            <aside className="">
                <nav className="">
                    <Link to="/gastos-por-dia">Gastos por Dia</Link>
                    <Link to="/gatos-fijos">Gastos Fijos</Link>
                    <button className="bg-red-600 border rounded-lg font-semibold uppercase p-2 text-white">Cerrar Sesión</button>
                </nav>
            </aside>
        </>
    );
}

export default Navegacion;