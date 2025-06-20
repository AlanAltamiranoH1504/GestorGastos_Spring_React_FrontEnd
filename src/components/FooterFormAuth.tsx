import {Link} from "react-router-dom";

const FooterFormAuth = () => {
    return(
        <>
            <div className="flex justify-between align-middle items-center mt-5">
                <Link className="text-slate-500 hover:text-blue-500 font-bold" to="/auth/registro">Crear Cuenta</Link>
                <Link className="text-slate-500 hover:text-blue-500 font-bold" to="/auth/login">Iniciar Sesión</Link>
            </div>
        </>
    );
}
export default FooterFormAuth;