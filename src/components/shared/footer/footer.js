import React from "react";
import { useEffect } from "react";
import './footer.scss';

export default function Footer() {
    let currentYear = new Date().getFullYear();

    return (
        <footer id="FooterTD" className="text-center">
            <small id="FooterTable">
                Powered by{" "}
                <a href="http://civilsoft.net/" id="csyear" target="_blank">
                    Civilsoft {currentYear}
                </a>
                &nbsp;
                <i className="fa fa-copyright" aria-hidden="true"></i>All Rights
                Reserved
            </small>
            <small>
                <span id="lblLoginSource"></span>
            </small>
        </footer>
    );
}
