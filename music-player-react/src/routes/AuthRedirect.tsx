import { Navigate } from 'react-router-dom'
import React from "react";
interface Props {
  children: React.JSX.Element;
}

const AuthRedirect = ({ children } : Props) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/" /> : children
}

export default AuthRedirect
