import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import {React, useState} from 'react';
import Home from "./pages/index";
import Applicants from "./pages/Table";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthenticationForm from "./AuthenticationForm";
import ApplicationClosed from "./pages/ApplicationClosed";
// import Payment from "./pages/Payment";
import PayLater from "./pages/PayLater";
import SuccessfulPayment from "./pages/SuccessfulPayment";
import PayLaterResponse from "./pages/PayLaterResponse";
import NotFoundPage from "./pages/NotFound";
import TestWebPage from "./pages/TestWebPage";


export default function App() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    
          <div
      style={{
        overflowY: "auto",
        overflowX: "hidden"
      }}
    >
      <AuthenticationForm  isAuth = {isAuth} setIsAuth = {setIsAuth}/>
      <BrowserRouter>
      <Switch>
        <Route exact path="/"  component={Home} />
          <ProtectedRoute path="/applicants" component={Applicants} isAuth = {isAuth}/>
          <Route path="/applicationClosed" exact component={ApplicationClosed} />
          {/* <Route path= "/payment/:email" component={Payment} /> */}
          {/* <Route path= "/payment" component={Payment} /> */}
          <Route path= "/resumeApplication" component={PayLater} />
          <Route path="/paymentresponse" component={SuccessfulPayment}/>
          <Route path="/payLater" component={PayLaterResponse}/>
          <Route path="/404"  component={NotFoundPage} />
          <Route path="/testpage"  component={TestWebPage} />
          {/* <Redirect from='/' to = '/404' exact/> */}
          <Route path="*"  component={NotFoundPage} /> 
      </Switch>
       
      </BrowserRouter>
    </div>
  
  );
}