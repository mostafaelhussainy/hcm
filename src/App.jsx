import React, { useRef, Suspense } from "react";
import SideMenu from "./components/SideMenu/SideMenu";
import "./app.scss";
import Header from "./components/shared/header/header";
import Dashboard from "./routes/dashBoard";
import { useState } from "react";
import Footer from "./components/shared/footer/footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { useFetch } from "./hooks/useFetch";
import MainLoader from "./components/shared/loader/mainLoader";
import { setAuthInfo } from "./Authontcation/authSlice";
import { setMainLoader } from "./features/shared/loadersSlice";
import { AuthProvider } from "./Authontcation/authActions";
import { setAuthState } from "./Authontcation/authActions";
import RequireAuth from "./Authontcation/requireAuth";
import AuthError from "./routes/authError";
import NotFoundError from "./routes/404";
//const LazyDashboard = React.lazy(() => import('./routes/dashBoard'));
//const LazyAuthError = React.lazy(() => import('./routes/authError'));
//const LazyNotFoundError = React.lazy(() => import('./routes/404'));

function App() {
    const ref = useRef();
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const globalState = useSelector((state) => state);

    let toastProps = { type: "warning", message: "my message in toast" };
    /* const openToast =()=>{
      //   ref.current.openToast(true)
     }*/

    const [isUserAuth, setisUserAuth] = useState(null);
    const [systemLangState, setsystemLangState] = useState(null);

    const claerAuth = () => {
        setAuthInfo({ sytemlang: null, token: null });
    };
    useEffect(() => {
        // if(!isPinned){
        if (!isUserAuth) {
            dispatch(setMainLoader(true));
            fetch(`${globalState.baseURL}/Token/CreateToken`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.token) {
                        setisUserAuth(data.token);
                        setsystemLangState(data.systemLang);
                        dispatch(setMainLoader(false));
                        dispatch(
                            setAuthInfo({
                                sytemlang: data.systemLang,
                                token: data.token,
                            })
                        );
                        if (location.state) {
                            navigate(location.state.path);
                        }
                    } else {
                        window.location.href = `${globalState.baseURL}/m`;
                    }
                });
        }
    }, [isUserAuth]);
    return (
        <>
            {isUserAuth ? (
                <AuthProvider token={isUserAuth}>
                    <Header setSideMenuOpen={setSideMenuOpen} />
                    <SideMenu
                        sideMenuOpen={sideMenuOpen}
                        setSideMenuOpen={setSideMenuOpen}
                        systemLang={systemLangState}
                        token={isUserAuth}
                    />
                    <div className="container">
                        <Suspense>
                            <Routes>
                                <>
                                    <Route
                                        path="/*"
                                        element={
                                            <RequireAuth token={isUserAuth}>
                                                <Dashboard />
                                            </RequireAuth>
                                        }></Route>
                                    {/*<Route path="*" element={<NotFoundError />}></Route>*/}
                                    <Route
                                        path="/notAuthorized"
                                        element={<AuthError />}></Route>
                                </>
                            </Routes>
                        </Suspense>
                    </div>
                    <MainLoader />
                    <Footer />
                </AuthProvider>
            ) : (
                ""
            )}
        </>
    );
}

export default App;
