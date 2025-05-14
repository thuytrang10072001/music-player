import React from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import DropdownLogout from "./DropdownLogout";
import {btnIcon} from "../utils/helper";
const Header = () => {
 const nav = useNavigate();

  return (
    <header className="header fixed top-0 z-50 grid grid-cols-2 bg-linearPrimary py-2 px-3 rounded-t-lg h-16" style={{width: '73.5%'}}>
      <div className="header-left flex gap-5 items-center">
        <div className="btn-back-to flex text-4xl text-white">
            <Button className={btnIcon("text-4xl")}
                    onClick={() => nav(-1)}>
                {IoIosArrowDropleftCircle({className: ''})}
            </Button>
            <Button className={btnIcon("text-4xl")}
                    onClick={() => nav(1)}>
                {IoIosArrowDroprightCircle({className: ''})}
            </Button>
          {/*  <IoIosArrowDropleftCircle/>*/}
          {/*<IoIosArrowDroprightCircle/>*/}
        </div>
        <div className="p-[3px] rounded-3xl bg-linearPrimary w-3/4">
          <div className="bg-[#0A192F] rounded-3xl">
            <input
                className="search w-full p-2 bg-black text-white outline-none rounded-3xl font-medium"
                placeholder="Tìm kiếm..."
            />
          </div>
        </div>
      </div>
      <div className="header-right text-right flex items-center justify-content-end">
          { localStorage.getItem("user")?
              (<DropdownLogout/>) :
              (<div className="header-right-login">
                  <Button className="bg-transparent text-white border-0 font-semibold mr-2.5">
                      <a href="/sign-up">Đăng ký</a>
                  </Button>
                  <Button className="px-3 py-2.5 bg-white text-black font-semibold rounded-full">
                      <a href="/sign-in">Đăng nhập</a>
                  </Button>
              </div>)
          }
      </div>
    </header>
  );
};

export default Header;
