import Header from "./Header";
import {Link, Outlet} from "react-router-dom";
import type {UsuarioLogeado} from "../types";

type AppProps = {
    informacionUsuario: UsuarioLogeado
}
const App = ({informacionUsuario}: AppProps) => {
    const existeImagenPerfil: string = informacionUsuario.imagenURL ? informacionUsuario.imagenURL : "/imagenes/perfil2.webp";
    return (
        <>
            <Header/>
            <div className="bg-gray-100 min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1">
                            <Outlet/>
                        </div>
                        <div className="w-full md:w-96 bg-slate-900 px-5 py-10 space-y-3 rounded-lg">
                            <h2 className="text-2xl text-center text-white">Bievenido de Vuelta <span className="font-bold text-blue-400 block ">{informacionUsuario.nombre}</span></h2>
                            <img className="rounded-lg p-5 border border-2 shadow" src={existeImagenPerfil} alt="Imagen de perfil"/>
                            <p className="text-center text-lg font-black text-white"></p>
                            <Link className="text-center text-white p-2 block bg-blue-500 rounded-lg font-semibold text-lg hover:bg-blue-600" to="/perfil/editar">Editar Perfil</Link>
                            <Link className="text-center text-white p-2 block bg-orange-500 rounded-lg font-semibold text-lg hover:bg-orange-600" to="/gastos/por_dia">Agregar Gasto por Dia</Link>
                            <Link className="text-center text-white p-2 block bg-lime-500 rounded-lg font-semibold text-lg hover:bg-lime-600" to="/gastos/fijos">Agregar Gasto Fijo</Link>
                            <Link className="text-center text-white p-2 block bg-emerald-500 rounded-lg font-semibold text-lg hover:bg-emerald-600" to="/gastos/fijos">Agregar Proveedor</Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default App;