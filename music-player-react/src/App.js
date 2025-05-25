import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Routers from './routes/Routers';
import Loading from "./components/Loading";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
      <>
          <Routers/>
          <svg width="0" height="0">
              <linearGradient id="second-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                  <stop stopColor="#a8cf45" offset="0%"/>
                  <stop stopColor="#0098da" offset="100%"/>
              </linearGradient>
          </svg>
          <ToastContainer
              position="top-left"
              autoClose={3000}
          />
          <Loading/>
      </>
  );
}

export default App;
