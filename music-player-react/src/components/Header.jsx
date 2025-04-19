import React, { useRef, useEffect, useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Button } from 'react-bootstrap';

// import "./styles/header.css";

const Header = (props) => {
  return (
    <header className="header grid grid-cols-2 bg-bgHeader py-2 px-3 rounded-t-lg">
      <div className="header-left flex gap-5 items-center">
        <div className="btn-back-to flex text-4xl text-black">
          <IoIosArrowDropleftCircle/>
          <IoIosArrowDroprightCircle/>
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
      <div className="header-right text-right">
         <div className="header-right-login">
             <Button className="bg-transparent text-white border-0 font-semibold mr-2.5">
                 <a href="/sign-up">Đăng ký</a>
             </Button>
             <Button className="px-3 py-2.5 bg-white text-black font-semibold rounded-full">
                 <a href="/sign-in">Đăng nhập</a>
             </Button>
         </div>
      </div>
    </header>
  );
};

export default Header;
