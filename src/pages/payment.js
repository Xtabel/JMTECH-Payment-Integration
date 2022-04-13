import React,{useState,useEffect} from "react";
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import validators from "../utils/Validators";


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

}));


   

const Payment = () => {
    const classes = useStyles();
    const initialFormValues = {
      userid: "",
      accountName: "",
      accountEmail: "",
      amount :30000,
    };
    
     // Form Values
     const [formValues, setFormValues] = useState(initialFormValues);
     const [responseMsg, setResponseMsg] = useState("");
     const [responseData, setResponseData] = useState("");
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
    const proceedToPaymentHandler = () => {
      debugger
      // let formData = new FormData();
      // formData.append("accountName", formValues.accountName);
      // formData.append("amount", formValues.amount);
      // formData.append("EmailAddress", formValues.emailAddress);
      if (
        formValues.accountName !== "" &&
        formValues.accountEmail !== ""
      ) {
        axios
          .post(
            `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/ProcessPayment`,{
                accountName: formValues.accountName,
                amount: formValues.amount,
                accountEmail:formValues.accountEmail
          }
          )
          .then(function (response) {
            setResponseMsg(response.data.Msg);
            setResponseData(response.data.Data);
            alert(responseData);
            
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {});
      } else {
        alert("something")
      }
    };

    


    const payBtn = () =>{

    }
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
          
            <TextField
                        type="text"
                        onpaste="return false;"
                        ondrop="return false;"
                        autocomplete="off"
                        id="emailTextField"
                        color="secondary"
                        label="Email Address"
                        value={formValues.accountEmail.toLowerCase()}
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
                      <Button onClick={proceedToPaymentHandler} variant="contained" style={{backgroundColor:'#00a1f1', textTransform:'capitalize', color:'#fff'}}>Proceed to make payment</Button>
                     
              </FormControl>
           
            </div>
        </div>
        
    </div>
    </MuiThemeProvider>
  );
}

export default Payment;
