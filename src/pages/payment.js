import React,{useState,useEffect} from "react";
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import validators from "../utils/Validators";
import {useLocation } from 'react-router-dom';


const getMuiTheme = createTheme({
  palette: {
    secondary: { main: "#1a1a1a" },
    primary: { main: "#fe0000" },
  },
  overrides:{
    MuiFormControl:{
      root:{
        width:'60%'
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
    container:{
        backgroundColor: "#fff", width: "100%", height: "100vh",
        margin:'0px',
        padding:'0px',
        overflow:'hidden'
    },
    continuepaymsg:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'30px',
    },
    formcontainer:{
    },
    proceedToPayBtn:{
      backgroundColor:'#00a1f1', textTransform:'capitalize', color:'#fff',
      '&:hover':{
        backgroundColor:'#00a1f1'
      },
    },
    paymentLink:{
      textDecoration:'none',
      // pointerEvents:'none',
    },

}));


   

const Payment = (props) => {
  debugger
    // const {emailAddressHolder} = props;
    // let { email } = useParams();
    const location = useLocation();
    let email = location.state.emailAddressHolder
    console.log(email,"Email Address");
    const classes = useStyles();
    const initialFormValues = {
      userid: "",
      accountName: "",
      accountEmail:  "",
      amount :30000,
      url:"https://www.waeconline.org.ng/JMTechAPI/api/Applicant/VerifyPayment"
    };
    
     // Form Values
     
     const [formValues, setFormValues] = useState(initialFormValues);
     const [responseMsg, setResponseMsg] = useState("");
     const [theLinkSentByAkan, setTheLinkSentByAkan] = useState("https://www.google.com");
     const [responseData, setResponseData] = useState("");
     const [disableBtn, setDisableBtn] = useState(true);
     const [isButtonClicked, setIsButtonClicked] = useState(false);
    //  const [paymentLink, setPaymentLink] = useState("https://www.google.com")
    const [paymentProcessed, setPaymentProcessed] = useState(false);
    //  const linkStatus = () =>{
    //    var paymentLink = document.getElementsByClassName("make");
    //    paymentLink.style = "text-decoration:underline";
    //  }
  
    //  useEffect(()=>{
    //    console.log(email)
    //  })

     const SetIsRequiredError = (
      value,
      stateError,
      stateErrorMsg,
      len = 1,
      errorMsg = "Field is required",
      max = 0,
      select = false
    ) => {
      if (!validators.isRequired(value, len, max, select)) {
        setFormStates((prevState) => [
          {
            ...prevState,
            [stateError]: true,
            [stateErrorMsg]: errorMsg,
          },
        ]);
        return false;
      }
  
      setFormStates({ ...formStates, [stateError]: false, [stateErrorMsg]: "" });
      return true;
    };
     const initialFormState = {
      accountNameError: false,
      accountNameErrorMsg: "",
      amountError: false,
      amountErrorMsg: "",
      accountEmailError: false,
      accountEmailErrorMsg: "",
    };
    const [formStates, setFormStates] = React.useState(initialFormState);
    const accountNameHandler = (e) =>{
      if (e) {
        e.preventDefault();
        let accountNameValue = e.target.value;
        setFormValues({ ...formValues, accountName: accountNameValue });
        return SetIsRequiredError(
          accountNameValue,
          "accountNameError",
          "accountNameErrorMsg"
        );
      }
    }
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    const accountEmailHandler = (e) =>{
      if(e){
        e.preventDefault();
        var accountEmailValue = e.target.value.trim();
        setFormValues({...formValues, accountEmail:accountEmailValue})
      }
      if (accountEmailValue === "" || accountEmailValue === undefined) {
        setFormStates({
          ...formStates,
          accountEmailError: false,
          accountEmailErrorMsg: "",
        });
        return true;
      }
      if (!validators.isValidEmail(accountEmailValue)) {
        setFormStates({
          ...formStates,
          accountEmailError: true,
          accountEmailErrorMsg:
            "Please enter a valid email or clear your selection",
        });
        return false;
      }
      if (validators.isYahoo(accountEmailValue)) {
        setFormStates({
          ...formStates,
          accountEmailError: true,
          accountEmailErrorMsg: "Please do not enter a yahoo mail or ymail",
        });
        return false;
      }
      setFormStates({
        ...formStates,
        accountEmailError: false,
        accountEmailErrorMsg: "",
      });
      return true;
  
    }

   useEffect(()=>{
    if((formValues.accountName !== "") && (email !=="")){
      setDisableBtn(false);
    }
    else{
      setDisableBtn(true);
    }
   },[formValues.accountName, email])

    const proceedToPaymentHandler = () => {
     debugger
      if (
        formValues.accountName !== "" &&
        email !== ""
      ) {
        axios
          .post(
            `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/ProcessPayment`,{
                accountName: formValues.accountName,
                amount: formValues.amount,
                accountEmail:email,
                url: formValues.url,
          }
          )
          .then(function (response) {
            debugger
            if(response.data){
              setPaymentProcessed(true);
              setResponseMsg(response.data.Msg);
              setResponseData(response.data.Data);
            
            } 
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            debugger
            setIsButtonClicked(!isButtonClicked);
          });
      } else {
        alert("something")
      }
    };

   
    useEffect(()=>{
      debugger
      if(paymentProcessed === true && responseData !==""){
        window.location.href=`${responseMsg}`;
        // window.location.href='https://www.google.com';
      }
    },[paymentProcessed, isButtonClicked])


    useEffect(()=> {
      debugger
      if(paymentProcessed && responseData !==""){
        axios
          .post(
            `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/VerifyPayment?reference=${responseData}&emailAddress=${email}`
          )
          .then(function (response) {
            debugger
            if(response.data){
              
            } 
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            setPaymentProcessed(false);
          });
      }
    },[paymentProcessed, isButtonClicked])


    
  return (
    <MuiThemeProvider theme={getMuiTheme}>
    <div className={classes.container}>
        <div className={classes.continuepaymsg}>   
        <h3 style={{textAlign:'center'}}>Fill in the details below to proceed to payment</h3>
      
        </div>
        <div>
        <div style={{backgroundColor:'#ffd6de', color:'#000', textAlign:'center', padding:'15px', fontSize:'0.9em'}}>You are about to make a payment of &#8358;30,000 for this course</div>
            <div className={classes.continuepaymsg}>
              <FormControl>
              <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Account Name"
                        value={toTitleCase(formValues.accountName)}
                        error={formStates.accountNameError}
                        helperText={formStates.accountNameErrorMsg}
                        onChange={(event) => {
                          accountNameHandler(event);
                        }}
                        variant="outlined"
                        fullWidth
                      />
               <br/>
                        {/* {emailAddressHolder} */}
            <TextField
                disabled
                type="text"
                onpaste="return false;"
                ondrop="return false;"
                autocomplete="off"
                id="emailTextField"
                color="secondary"
                label="Email Address"
                value={email}
                error={formStates.accountEmailError}
                helperText={formStates.accountEmailErrorMsg}
                onFocus={(event) => {
                  // CopyandPasteHandler(event);
                }}
                onChange={(event) => {
                  accountEmailHandler(event);
                }}
                variant="outlined"
                fullWidth
              />
                      <br/>
                     
                <Button className={classes.proceedToPayBtn}disabled={disableBtn} onClick={()=>proceedToPaymentHandler()} variant="contained">
                  {isButtonClicked === true ?
                  <><CircularProgress color="secondary"/></>:
                  "Proceed to make payment"}
                  
                  </Button>
                      {/* <a rel={'external'} target="_blank" href={responseMsg} >
                      <Button className={classes.proceedToPayBtn}disabled={disableBtn} onClick={()=>proceedToPaymentHandler()} variant="contained">Proceed to make payment</Button>
                      </a> */}
                       {/* {isLinkActive?(
                         <Button className={classes.proceedToPayBtn}disabled={disableBtn} onClick={()=>proceedToPaymentHandler()} variant="contained">Proceed to make payment</Button>
                       ):(
                      <Link className={classes.paymentLink} to={{ pathname: `${responseMsg}`}}>
                    
                      </Link>)} */}
                     {/* <Button onClick={linkStatus}>Check</Button> */}
                     
              </FormControl>
           
            </div>
        </div>
        
    </div>
    </MuiThemeProvider>
  );
}

export default Payment;
