import { Navigate } from 'react-router-dom'
import React from "react";
interface Props {
    children: React.JSX.Element;
}

const PrivateRoute = ({ children } : Props) => {
    const token = localStorage.getItem('token')
    return token ? children : <Navigate to="/sign-in" />
}

export default PrivateRoute
