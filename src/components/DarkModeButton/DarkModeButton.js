import React from "react";
import "./DarkModeButton.css";

function DarkModeButton() {
    return (
        <div className="theme-switch-box">
            <label className="theme-switch" for="switch">
                <input type="checkbox" id="switch"/>
                    <div className="icons">
                        <div className="far fa-moon round"></div>
                        <div className="fas fa-sun round"></div>
                    </div>
            </label>
        </div>
    )
} 

export default DarkModeButton;