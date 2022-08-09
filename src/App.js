import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";

const App = ()=>{
  return(
    <AuthContextProvider>
         <ToastContainer />
      <AppRouter/>
    </AuthContextProvider>
  )

}


export default App