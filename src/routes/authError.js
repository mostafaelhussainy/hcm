import React from "react";
import { useEffect } from "react";
import authImage from '../assets/images/403Error.svg';


function AuthError() {
    const imageStyle = {
        width: "38%",
    }
    const imageContStyle = {
        textAlign:"center",
    }
    return (
        <div style={imageContStyle}>
            <img style={imageStyle} src={authImage} alt="not authorized" />

        </div>

    );
}
export default AuthError;