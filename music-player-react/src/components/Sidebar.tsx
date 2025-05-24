import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
    faMusic,
    faPlay,
    faSignal
} from "@fortawesome/free-solid-svg-icons";

import logo from '../assets/images/logo_tranny.png';

// import signOut from "../utils/signOut";
// import "./styles/tab.css";

const manager = [
    {
        label: "Music",
        items: [
            {
                path: "/",
                display: "Home",
                icon: faMusic,
            },
            {
                path: "/play-list",
                display: "Playlist",
                icon: faSignal,
            },
            {
                path: "/play-music",
                display: "Now playing",
                icon: faPlay,
            },
        ]
    }
];


const Sidebar = () => {

  return (
    <div className="nav-frame col-3 p-0 min-h-screen">
        <div className="position-fixed w-25">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width: "250px"}} className="m-auto"/>
            </div>
            <div style={{marginLeft: "30px"}}>
                {
                    manager.map((item, index) => (
                        <div className="nav-folder" key={`role-${index}`}>
                            <label>{item.label}</label>
                            <div className="nav-list">
                                {item.items.map((nav, index) => (
                                    <div className="nav-item" key={index}>
                                        <NavLink
                                            to={nav.path}
                                            className={(navClass) =>
                                                navClass.isActive ? "nav-active nav-item-link" : "nav-no-active nav-item-link"
                                            }
                                        >
                                            <div className="box-icon" style={{width: "2rem"}}>
                                                <FontAwesomeIcon icon={nav.icon} className="nav-icon"/>
                                            </div>
                                            {nav.display}
                                        </NavLink>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  );
};
export default Sidebar;
