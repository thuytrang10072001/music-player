import React, { useRef, useEffect, useState } from "react";
import logo from "../assets/images/logo_tranny.png";

// import "./styles/header.css";

interface Props {
    children: React.JSX.Element;
}
const FrameForm = ({children}: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 min-h-full p-6 lg:p-8 h-screen max-h-screen bg-zinc-900">
            <div className="m-auto">
                <img className="h-100 w-auto" src={logo} alt="Tranny"/>
            </div>
            <div className="my-auto">
                <div className="p-5 border-1 border-white rounded-lg bg-linearWhiteBlack">
                    <div className="mt-10 sm:m-auto sm:w-full sm:max-w-sm max">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrameForm;
