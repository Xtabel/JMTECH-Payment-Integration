import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { withStyles,makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {useHistory, useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaystackPop from '@paystack/inline-js';



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) =>({
    submitBtn:{
        transition:'all 0.5s',
        '&:hover':{
            paddingRight:'30px',
            paddingLeft:"30px",
           
            color:'#FFF',
            transition:'0.5s'
        },
    },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const ProceedToPayment = (props)=> {
  
  const { openPay, handleClosePay,handleClickPayLater,emailAddressHolder,responseFirstName, responseLastName} = props
 
  const [responseMsg, setResponseMsg] = useState("");
  const [responseData, setResponseData] = useState("");
  const [refNumber, setRefNumber] = useState(null);

  const classes = useStyles();
  const fullname = responseFirstName+ " "+responseLastName;
  const[toPage,setToPage]=useState("/payment/");
  const initialFormValue = {
      initialtoken:"1A2B5E",
      token:"",
      amount: 30000
  };
  const [formValue, setFormValue] = useState(initialFormValue);

  // const {setIsAuth} = useContext(AuthContext);
  // const navigate = useNavigate();
  const history = useHistory(); 

  const goToPayLater = ()=>{
    history.push("/paylater",{fullname,emailAddressHolder})
  }


  const handleClosePayLater=()=>{
    history.push("/paylater",{fullname,emailAddressHolder})
  } 

  const payLaterHandler = () =>{
    debugger
    let formData = new FormData();
    formData.append("emailAddress", emailAddressHolder);
    formData.append("fullName", responseFirstName);
    if(responseFirstName !=="" && responseLastName!=="" && emailAddressHolder !==""){
      debugger
      axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/PayLater?emailAddress=${emailAddressHolder}&fullName=${fullname}`)
      .then(function (response) {
        debugger
        setResponseMsg(response.data.Msg)
        goToPayLater()
       
      })
      .catch(function (error) {
        toast.error(responseMsg);
      })
      .then(function () {
        debugger
      });
  } else {
 
    }


 
  }

 
  const proceedToPayBtn = () =>{
    axios
    .post(
      `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/ProcessPayment`, {
          accountName: fullname,
          amount: formValue.amount,
          accountEmail:emailAddressHolder,
          url: "https://application.jmtechcenter.org/paymentresponse",
      }
    )
    .then(function (response) {
      debugger
      console.log(response)
      if(response.data){
        setResponseData(response.data.Data);
         window.location.href=`${response.data.Msg}`;
        
      } 
    })
    .catch(function (error) {
      console.log(error);
    })
    
  }

  // const payWithPaystack = () =>{

  //     // history.push("/payment",{emailAddressHolder})

  //          axios
  //            .post(
  //              `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/ProcessPayment`, {
  //                  accountName: 'fcfg',
  //                  amount: (30000 * 100),
  //                  accountEmail: emailAddressHolder,
  //                  url: "",
  //              }
  //            )
  //            .then(function (response) {
               
  //              console.log(response)
  //              if(response.data){
  //               setRefNumber(response.data.Data);
                
                
                 
   
                 
  //              } 
  //            })
  //            .catch(function (error) {
  //              console.log(error);
  //            })
             
             
       
      




  // const handler = PaystackPop.setup({
  //   key: 'pk_test_62650f7da63fcbb8b10b32aaf2a4da244ad309dc', // Replace with your public key
  //   currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
  //   callback: function(refNumber) {
  //     //this happens after the payment is completed successfully
  //     const reference = refNumber;
  //     alert('Payment complete! Reference: ' + reference);  

  //     axios
  //     .post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/VerifyPayment?reference=${reference}&emailAddress=${emailAddressHolder}`)
  //     .then(function (response) {
  //       console.log(response)
  //       if(response.data){
         

  //         history.push("/payment",{emailAddressHolder})

         
          

          
  //       } 
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })



  //   },
  //   onClose: function() {
  //     alert('Transaction was not completed, window closed.');
  //   },
  // });
  // handler.openIframe();



    
  // }
  const notify = () => toast.error("Unrecognised Authentication Token!");

  // const sendToPage = () =>{
  //   navigate.push("/payment",{emailAddressHolder})
  // }

  const items = emailAddressHolder;

  useEffect(()=>{
      localStorage.setItem('items', JSON.stringify(items));
  },[items])
  

return (
  <div>
    {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Open dialog
    </Button> */}
    <Dialog
      onClose={handleClosePay}
      aria-labelledby="customized-dialog-title"
      open={openPay}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClosePayLater}>
       Proceed To Payment
      </DialogTitle>
      <DialogContent dividers>
          To complete registration, you have to make a payment of  <span style={{color:'#fe0000'}}>&#8358;30,000</span>. 
          Do you wish to proceed with the payment?
      
      </DialogContent>
      <DialogActions>
      
      <Button className={classes.submitBtn}onClick={payLaterHandler}style={{backgroundColor:"#94949485", color:'#fff', textTransform:'capitalize'}}>
          Pay Later
        </Button>
        <Button className={classes.submitBtn}onClick={proceedToPayBtn}style={{backgroundColor:"#00a1f1", color:'#fff', textTransform:'capitalize'}}>
          Pay Now
        </Button>
     

       <ToastContainer  />
      </DialogActions>
    </Dialog>

           
  </div>
);
}

export default ProceedToPayment