import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import mainLoader from '../../../assets/images/mainLoader.svg';


const overlayStyle={
    position:'fixed',
    bottom:'0px',
    left:'0px',
    width:'100%',
    height:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    zIndex:"10000"
}
const imageStyle={
    margin: '0 auto',
    display: 'block',
    top: '20em',
    position: 'relative',
    width: '6%',
}
export default function MainLoader(props) {
    const showMainLoader = useSelector((state) => state.loader.showMainLoader);

    return (
        <>
        {showMainLoader ? (
            <div className="loaderCont" style={overlayStyle}>
            <div className="overlay"></div>

          <img src={mainLoader} style={imageStyle}/>
            </div>
        ):null
        }
        </>

    );
}
