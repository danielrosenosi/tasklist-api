import AppRoutes from "./routing";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../global.css";

function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}

export default App;
