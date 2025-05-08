import Routers from './routes/Routers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";

import './App.css';

function App() {
  return (
      <>
        <Routers />
        <ToastContainer
            position="top-left"
            autoClose={3000}
        />
        <Loading/>
      </>
  );
}

export default App;
