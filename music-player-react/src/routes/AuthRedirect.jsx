import { Navigate } from 'react-router-dom'

const AuthRedirect = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? <Navigate to="/" /> : children
}

export default AuthRedirect
