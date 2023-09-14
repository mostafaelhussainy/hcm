import React from "react";
import authImage from '../assets/images/404Error.svg';
function NotFoundError() {
    const imageStyle = {
        width: "38%",
    }
    const imageContStyle = {
        textAlign:"center",
    }
    return (
        <>
        <div style={imageContStyle}>
            <img style={imageStyle} src={authImage} alt="not authorized" />
        </div>
        </>
    );
}
export default NotFoundError;