import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="bg-slate-900 py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full py-5 lg:p-0 w-1/3">
                        <img src="/logo.svg" alt="Logo de Aplicacion" className="w-full block h-24"/>
                    </div>
                    <div className="md:w-2/3 md:flex md:justify-end space-x-5 items-center align-middle">
                        <Link className="text-xl text-white font-semibold uppercase border-b hover:text-blue-400  hover:border-b-blue-400" to="/gastos_fijos">Gastos Fijos</Link>
                        <Link className="text-xl text-white font-semibold uppercase border-b hover:text-blue-400  hover:border-b-blue-400" to="/gastos_fijos">Gastos por Dia</Link>
                        <button type="button" className="bg-red-600 py-2 px-3 text-white font-semibold text-lg rounded-lg hover:bg-red-700">Cerrar Sesión</button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;