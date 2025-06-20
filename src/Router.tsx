import {BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout/>}>
                    <Route path="/iniciar-sesion" element={<RegisterView/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}