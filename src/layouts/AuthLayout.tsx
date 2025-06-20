import {Fragment} from "react";
import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <Fragment>
            <div className="bg-slate-900 min-h-screen">
                <div className="max-w-lg mx-auto pt-10 px-5">
                    <img src="/logo.svg" alt="Logo de aplicacion" className="mx-auto"/>
                    <div className="py-10">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AuthLayout;