import React,{useState} from 'react';
import { withStyles,makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  debugger
  const { openPay, handleClosePay,handleClickPayLater,emailAddressHolder} = props
  const classes = useStyles();
  const[toPage,setToPage]=useState("/payment/");
  const initialFormValue = {
      initialtoken:"1A2B5E",
      token:""
  };
  const [formValue, setFormValue] = useState(initialFormValue);

  // const {setIsAuth} = useContext(AuthContext);
  // const navigate = useNavigate();
  const history = useHistory(); 
  const payLaterHandler = () =>{
    handleClickPayLater();
      // setToPage("/")
  }
  const proceedBtn = () =>{
      // setToPage()
      debugger
      history.push("/payment",{emailAddressHolder})
      // console.log(emailAddressHolder)

  }
  const notify = () => toast.error("Unrecognised Authentication Token!");

  // const sendToPage = () =>{
  //   navigate.push("/payment",{emailAddressHolder})
  // }


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
      <DialogTitle id="customized-dialog-title" onClose={handleClosePay}>
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
        <Button className={classes.submitBtn}onClick={proceedBtn}style={{backgroundColor:"#00a1f1", color:'#fff', textTransform:'capitalize'}}>
          Pay Now
        </Button>
     

       <ToastContainer  />
      </DialogActions>
    </Dialog>

           
  </div>
);
}

export default ProceedToPayment