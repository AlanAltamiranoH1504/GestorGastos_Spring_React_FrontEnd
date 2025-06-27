import {useQuery} from "@tanstack/react-query";
import {findByEmail} from "../api/springboot_api";
import Error404 from "../components/404";
import App from "../components/App";
import type {UsuarioLogeado} from "../types";

const AppLayout = () => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["findUsuarioByEmail"],
        queryFn: () => findByEmail("alan@gmail.com"),
        retry: false
    });
    const informacionUsuario: UsuarioLogeado = data;
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
            <App informacionUsuario={informacionUsuario}/>
        </>
    );
}
export default AppLayout