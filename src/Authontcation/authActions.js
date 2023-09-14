import { createContext, useContext, useState, useEffect } from "react";
import { setAuthInfo } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMainLoader } from "../features/shared/loadersSlice";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, token }) => {
    //const [auth, setAuth]=useState((state) => state.auth.userToken);
    //const token = useSelector((state) => state.auth.userToken);

    const [auth, setAuth] = useState(token);
    const dispatch = useDispatch();

    const setAuthState = (token) => {
        setAuth(token);
    };

    const logout = () => {
        dispatch(setAuthInfo({ sytemlang: null, token: null }));
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuthState, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
