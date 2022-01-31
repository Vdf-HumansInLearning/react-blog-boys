import React from "react";
import "./Error404.css"

function Error404() {
    return (
        <div className="error-box" id="error-box">
            <div className="error-info">
                <h1 className="error-message">Error 404 - Page not found!</h1>
                <a href="/">
                    <button type="button" className="to-homepage">BACK TO HOMEPAGE</button>
                </a>
            </div>
        </div>
    )
}

export default Error404;