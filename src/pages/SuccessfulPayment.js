import React from "react";
import {
  // makeStyles,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {Paper } from "@material-ui/core";
import {useLocation} from 'react-router-dom'; 
// import success from "../assets/success.png";
// import success1 from "../assets/success1.png";
// import success3 from "../assets/success3.gif";
import patternbg from "../assets/patternbg.png";
// import bg from "../assets/bg.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";


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
      MuiCssBaseline: {
        "@global": {
          body: {
            backgroundImage:`url(${patternbg})`, backgroundSize:'cover',backgroundPosition:'bottom', backgroundRepeat:'no-repeat',
          }

        },
        "@media screen and (max-width:450px)":{
            body:{
                backgroundImage:`url(${patternbg})`, backgroundSize:'cover',backgroundPosition:'bottom', backgroundRepeat:'no-repeat',
            }
        }
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
  

// const useStyles = makeStyles((theme)=>({
//     images:{
//         width:'500px',
//         height:'auto'
//     },
//     root: {
//         "& body": {
//           backgroundColor:'#fff !important',
//           backgroundImage:"none"
//         }
//       },

// }));



const SuccessfulPayment = () =>{
    // const classes = useStyles();
    const location = useLocation();
    const refcode = location.responseData;
    const emailAddress = location.email;

    return(
        <MuiThemeProvider theme={getMuiTheme}>
            <CssBaseline/>
              <Container maxWidth="xl">
                 <Box my={2} style={{height:'100vh'}} >
           
                <Paper elevation={0} style={{textAlign:'center', paddingTop:'50px'}}>
                <h1 style={{color:'#4BB543'}}>Congratulations!</h1>
                <h3 style={{color:'#1a1a1a95', fontWeight:'500'}}>Your Payment {refcode} {emailAddress} is successful, check the <span style={{color:'#1a1a1a',fontWeight:'700'}}>email address</span> you used to register to get your registration code.</h3>
              
                </Paper>
        </Box>
        </Container>
        </MuiThemeProvider>
      
    );
}

export default SuccessfulPayment;