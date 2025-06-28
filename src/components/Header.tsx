import {Link} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header className="bg-slate-900 py-5">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <Link to="/administracion">
                            <img src="/logo.svg" alt="Logo svg" className="w-full block max-h-32" />
                        </Link>
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end md:gap-5 space-x-5">
                        <button type="button" className="bg-blue-500 px-3 py-2 rounded-lg text-white text-lg font-semibold hover:bg-blue-600">Cerrar Sesion</button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;