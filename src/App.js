import { Route, BrowserRouter } from "react-router-dom";
import {React, useState} from 'react';
import Home from "./pages/index";
import Applicants from "./pages/Table";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthenticationForm from "./AuthenticationForm";
import ApplicationClosed from "./pages/ApplicationClosed";
import Payment from "./pages/Payment";
import PayLater from "./pages/PayLater";



export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  debugger
  return (
    
          <div
      style={{
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <AuthenticationForm  isAuth = {isAuth} setIsAuth = {setIsAuth}/>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <ProtectedRoute path="/applicants" component={Applicants} isAuth = {isAuth}/>
        <Route path="/applicationClosed" exact component={ApplicationClosed} />
        {/* <Route path= "/payment/:email" component={Payment} /> */}
        <Route path= "/payment" component={Payment} />
        <Route path= "/paylater" component={PayLater} />
      </BrowserRouter>
    </div>
  
  );
}