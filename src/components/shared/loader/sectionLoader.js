import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import './sectionLoader.scss'

export default function SectionLoader() {
    const showSectionLoader = useSelector((state) => state.loader.showSectionLoader);

    return (
        <>
        {showSectionLoader ? (
            <div className="loaderCont" >
              <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </div>
        ):null
        }
        </>

    );
}
