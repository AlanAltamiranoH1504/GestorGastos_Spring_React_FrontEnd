import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {findByEmail} from "../api/springboot_api";
import Header from "../components/Header";
import Error404 from "../components/404";

const AdministracionView = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["findUsuarioByEmail"],
        queryFn: () => findByEmail("alan@gmail.com"),
        retry: false
    });
    if (isLoading) {
        return <p className="text-center mt-10">Cargando usuario...</p>;
    }

    if (error) {
        return <Error404/>
    }

    if (!data) {
        return <p className="text-center mt-10 text-yellow-600">No se encontraron datos del usuario</p>;
    }
    return (
        <>
            <Header/>
            <div className="bg-gray-100 min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-center text-slate-800 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1">
                            Contenido aqui
                        </div>
                        <div className="w-full md:w-96 bg-slate-900 px-5 py-10 space-y-6 rounded-lg">
                            <h2 className="text-white text-xl text-center">Bienvenido de vuelta: <strong className="block">{data.nombre}</strong></h2>
                            {data.imagen ? (
                                <>
                                    <p>Existe foto de perfil</p>
                                </>
                            ) : (
                                <>
                                    <div className="md:flex md:justify-center">
                                        <img src="/imagenes/perfil2.webp" alt="Foto de perfil" className="h-60"/>
                                    </div>
                                    <div className="md:flex md:flex-col space-y-4">
                                        <Link className="border p-2 text-white text-center font-semibold rounded-lg bg-blue-700 border-blue-700 hover:bg-blue-800" to="/perfil/edicion">Editar Perfil</Link>
                                        <Link className="border p-2 text-white text-center font-semibold rounded-lg bg-orange-600 border-orange-600 hover:bg-orange-700" to="/perfil/actualizar-password">Actualizar Password</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
export default AdministracionView;