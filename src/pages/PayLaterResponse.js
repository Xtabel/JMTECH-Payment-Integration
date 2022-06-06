import React, { useState } from "react";
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Button, Paper,} from "@material-ui/core";
import paylater from "../assets/paylater.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useLocation } from 'react-router-dom';
import axios from 'axios';
import NotFoundPage from "./NotFound";
import { ToastContainer, toast } from 'react-toastify';


// style={{ backgroundImage:`url(${patternbg})`, backgroundSize:'cover', overflow:'hidden',backgroundPosition:'bottom', backgroundRepeat:'no-repeat'}} 
const getMuiTheme = createTheme({
    palette: {
      secondary: { main: "#1a1a1a" },
      primary: { main: "#fe0000" },
      background:{
        // default:`url(${bg})`, 
        // paper:"#fe0000",
      },
    },
  
    overrides: {
      MuiToolbar: {
        regular: {
          justifyContent: "space-between",
        },
      },
    
      // MuiContainer:{
      //   maxWidthLg:{
      //     maxWidth:''
      //   }
      // },
      MuiGrid:{
        container:{
          display:'block',
        }
      },
      '& body':{
       backgroundColor:'red !important'
      },
      MuiFormControl: {
        root: {
          // display:'flex',
          // marging:'0px 100px'
        },
      },
    },
  });
  

const useStyles = makeStyles((theme)=>({
    images:{
        width:'300px',
        height:'auto'
    },
    root: {
        "& body": {
          backgroundColor:'#fff !important',
          backgroundImage:"none"
        }
      },
      infoText:{
        color:'#1a1a1a95', fontWeight:'500',
        [theme.breakpoints.only("xs")]: {
            fontSize:'15px',
          },
      },
      otherText:{
        color:'#1a1a1a',
        [theme.breakpoints.only("xs")]: {
          fontSize:'14px',
        },
      },

      deadlineText:{
        // color:"#FF5D5D",
        animation: '$Color 4s linear infinite',
        '-webkit-animation': '$Color 4s ease-in-out infinite',
      },
      button:{
        backgroundColor:'#009dff',
        color:'#fff',
        padding:'15px',
        border:'none',
        borderRadius:'5px',
        marginLeft:'10px',
        textTransform:'capitalize',
        transition:'all 0.5s ease-out',

        '&:hover':{
          backgroundColor:'#009dff',
          color:'#fff',
          padding:'15px 30px',
        },
      },
      "@keyframes Color":{
        "0%":{
          color:'#A0D468',
        },
        
        "20%":{
          color:'#4FC1E9',
        },
        
        "40%":{
          color:'#FFCE54',
        },
        
        "60%":{
          color:'#FC6E51',
        },
        "80%":{
          color:'#ED5565',
        },
        
        "100%":{
          color:'#AC92EC',
        }
      }
      

}));



const PayLaterResponse = () =>{
  let fullname="";
  let email ="";
    const classes = useStyles();
    const location = useLocation();
    // const [show404, setShow404]= useState(false);
    const [responseMsg, setResponseMsg]=useState("")
    if(location.state.fullname !=="" && location.state.fullname !=="" && location.state.fullname !==undefined && location.state.fullname !== undefined){

    fullname= location.state.fullname;
   
    email=location.state.emailAddressHolder;
    }
    else{
     <NotFoundPage/>
    }
    const resendLink = () =>{
      if(fullname !=="" && email!==""){
        
        axios
        .post(
          `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/PayLater?emailAddress=${email}&fullName=${fullname}`)
        .then(function (response) {
          
          setResponseMsg(response.data.Msg)
         
        })
        .catch(function (error) {
        toast.error(responseMsg)
        })
        .then(function () {
          
        });
    } else {
      // alert("something")
    
      }
  
  
    }
    return(
        <MuiThemeProvider theme={getMuiTheme}>
            <CssBaseline/>
              <Container maxWidth="xl">
                 <Box my={2} style={{height:'100vh'}} >
           
                <Paper elevation={0} style={{textAlign:'center', paddingTop:'30px'}}>
                 <img className={classes.images} src={paylater} alt="You can decide to Pay Later"/>   
                <h1 style={{color:'#37474F', fontWeight:'600px'}}>Pay later before <span className={classes.deadlineText}>deadline</span> </h1>
                <h2 className={classes.infoText}>Hello {fullname}, your registration has been saved and a link to continue your application has been sent to your email address.</h2>
                
                <h3 className={classes.otherText}>Didn't get the link to your Email Address? Click on the button to resend </h3>
                <Button className={classes.button} onClick={resendLink}>Resend Link</Button>
                </Paper>
                    <ToastContainer  />
        </Box>
        </Container>
        </MuiThemeProvider>
      
    );
}

export default PayLaterResponse;