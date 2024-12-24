import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "../../pages/Home";
import {Login} from "../../pages/Login";
import {Register} from "../../pages/Register";
import {Cars} from "../../pages/Cars";
import {NotFound} from "../../pages/NotFound";
import {Dashboard} from "../../pages/Dashboard";
import AuthRedirect from "../AuthRedirect";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route
                    path="/cars"
                    element={
                        <AuthRedirect>
                            <Cars/>
                        </AuthRedirect>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <AuthRedirect>
                            <Dashboard/>
                        </AuthRedirect>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default Navigation;
