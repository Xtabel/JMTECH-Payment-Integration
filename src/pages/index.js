import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./style.css";
import AppBar from "@material-ui/core/AppBar";
import validators from "../utils/Validators";
import Toolbar from "@material-ui/core/Toolbar";
import {
  makeStyles,
  createTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import newlogo from "../assets/newlogo.png";
import image2 from "../assets/image2.gif";
import bg from "../assets/bg.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DescriptionIcon from "@material-ui/icons/Description";
import { CircularProgress } from "@material-ui/core";
// import AuthenticationForm from "../AuthenticationForm";
import ProceedToPayForm from "./ProceedToPayForm";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

// axios.defaults.baseURL = "http://jmtechcentre.azurewebsites.net/api/Applicant/";
// axios.defaults.baseURL = "https://www.waeconline.org.ng/JMTechAPI/swagger/index.html";

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
          backgroundImage:
          `url(${bg})`,
          backgroundSize: 'cover',
          backgroundRepeat:'no-repeat',
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

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    transition: "all easein 1s",
    [theme.breakpoints.only("xs")]: {
      padding: "0px !important",
    },
  },
  papers: {
    padding: theme.spacing(5),
    textAlign: "center",
    color: theme.palette.text.secondary,
    transition: "all easein 1s",
    backgroundColor: "rgba(255,255,255,0.95)",
    [theme.breakpoints.only("xs")]: {
      marginTop: "0px !important",
      fontSize: "9px",
      padding: "0px",
    },
  },
  ApplyHereBtn: {
    textTransform: "capitalize",
  },
  forms: {
    margin: "30px",
  },
  homePage: {
    transition: "all easein 1s",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  grids: {
    marginRight: "20px",
    transition: "all easein 1s",
    [theme.breakpoints.only("xs")]: {
      marginRight: "0px !important",
    },
  },
  theImage: {
    width:'80%',
    [theme.breakpoints.only("xs")]: {
      width: "300px",
      height: "auto",
    },
  },
  applyNow: {
    marginBottom: "10px",
    marginTop: "20px",
    [theme.breakpoints.only("xs")]: {
      fontSize:'12px'
    },
  },
  buttonUploadPhoto: {
    [theme.breakpoints.only("xs")]: {
      padding: "10px",
      marginBottom: "10px",
    },
  },
  formText: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.4em",
    },
  },
  programText: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em",
    },
  },
  cvformatError: {
    color: "#fe0000",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em",
    },
  },
  Logo: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function BackToTop(props) {
  // const dispatch = useDispatch();

  
  const genders = [
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
  ];

  const qualifications = [
    {
      value: "HND",
      label: "HND",
    },
    {
      value: "1st Degree",
      label: "1st Degree",
    },
    {
      value: "Master",
      label: "Master",
    },
    {
      value: "PHD",
      label: "PHD",
    },
    {
      value: "Others",
      label: "Others",
    },
  ];

  const initialFormValues = {
    userid: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    emailAddressLogin: "",
    phoneNumberAddressLogin: "",
    countryCodeLogin: "",
    emailAddressConfirm: "",
    phoneNumber: "",
    phoneNumberConfirm: "",
    states: "",
    lga: "",
    city: "",
    cityid: "",
    sex: "",
    countryCode: "",
    countryId:"156",
    highestQualification: "",
    courseOfStudy: "",
    nameOfInstitution: "",
    courseChoice: "",
    passport: "",
    cv: "",
  };

  const initialFormState = {
    firstNameError: false,
    firstNameErrorMsg: "",
    lastNameError: false,
    lastNameErrorMsg: "",
    emailAddressError: false,
    emailAddressErrorMsg: "",
    emailAddressConfirmError: false,
    emailAddressConfirmErrorMsg: "",
    phoneNumberError: false,
    phoneNumberErrorMsg: "",
    phoneNumberConfirmError: false,
    phoneNumberConfirmErrorMsg: "",
    stateError: false,
    stateErrorMsg: "",
    lgaError: false,
    lgaErrorMsg: "Select a state before choosing LGA",
    cityError: false,
    cityErrorMsg: "",
    highestQualificationError: false,
    highestQualificationErrorMsg: "",
    courseOfStudyError: false,
    courseOfStudyErrorMsg: "",
    nameOfInstitutionError: false,
    nameOfInstitutionErrorMsg: "",
    genderError: false,
    genderErrorMsg: "",
    countryCodeError: false,
    countryCodeErrorMsg: "",
    countryCodeConfirmError: false,
    countryCodeConfirmErrorMsg: "",
    uploadPassportError: false,
    uploadPassportErrorMsg: "",
    uploadCVError: false,
    uploadCVErrorMsg: "",
  };
  // const [open, setOpen] = useState(false);
  // const[toPage,setToPage]=useState("");

  
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [responseFirstName, setResponseFirstName] = useState("");
  const [responseLastName, setResponseLastName] = useState("")
  const [responseRegistrationCode, setResponseRegistrationCode] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFailure, setSubmitFailure] = useState(false);
  const [emailAddressHolder,setEmailAddressHolder] = useState("");
  const [formStates, setFormStates] = React.useState(initialFormState);
  const [lgaDisable, setLgaDisable] = useState(true);
  const [loader, setLoader] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [imageFormatMsg, setImageFormatMsg] = useState("");
  const [cvFormatMsg, setCvFormatMsg] = useState("");
  const [generalErrorMsg, setGeneralErrorMsg] = useState("");
  const [file, setFile] = useState(null);
  const [fileCV, setFileCV] = useState(null);
  const [displayPicture, setDisplayPicture] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPayLater, setIsPayLater] = useState(false);
  const [theState, setTheState] = useState([]);
  const [theLga, setTheLga] = useState([]);
  const [answer, setAnswer] = React.useState("");
  const [openPay,setOpenPay]= useState(false);

  const handleClickPayLater = ()=>{
    setIsSubmitted(true);
    handleClosePay();
    setIsPayLater(true);
  }

  const handleClosePay = () =>{
    setOpenPay(false);
  }

  const handleChangeAnswer = (event) => {
    const answers = event.target.value;
    setAnswer(answers);
    // setHideSchool(false);
  };
  const handlePickNo = (event)=>{
    const answers = event.target.value;
    setAnswer(answers);

  }
  

  // Form Values
  const [formValues, setFormValues] = useState(initialFormValues);

  const [pictureName, setPictureName] = useState("");
  const [CVName, setCVName] = useState("");
  const [openPictureSection, setOpenPictureSection] = useState(false);
  const [openCVSection, setOpenCVSection] = useState(false);
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

  // useEffect(()=>{
  //   const getRepo = async ()=>{
  //     try{
  //       const response = await axios.post('http://jmtechcentre.azurewebsites.net/api/Applicant/GetCoursePrograms');
  //       const myRepo = response.data;
  //       setRepo(myRepo);
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //   }
  // },[])

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const [dataDropDown, setDataDropDown] = useState([]);
  const [countryCodeDropDown, setCountryCodeDropDown] = useState([]);
  const fetchCountryCode = () => {
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetCountryCode`
      )
      .then(function (response) {
        // handle success
        setCountryCodeDropDown(response.data.Data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        // always executed
      });
  };

  const fetchData = () => {
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetCoursePrograms`
      )
      .then(function (response) {
        // handle success
        setDataDropDown(response.data.Data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        setLoader(false);
      });
  };
  const fetchStates = () => {
    axios
      .post(`https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetStates`)
      .then(function (response) {
        // handle success
        setTheState(response.data.Data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        // always executed
      });
  };

  const fetchLGA = (stateIds) => {
    axios
      .post(
        `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/GetLGAByStateId?stateId=${stateIds}`
      )
      .then(function (response) {
        // handle success
        setLgaDisable(false);
        setTheLga(response.data.Data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        // alert('Error occured in loading All Data');
      })
      .then(function () {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
    fetchStates();
    fetchCountryCode();
    // console.log(emailAddressHolder)
  }, []);
  const logoFunction = () => {
    // var HomePageArea = document.getElementById("HomePage");
    // HomePageArea.style = "display:flex";
    // var applicationForms = document.getElementById("forms");
    // applicationForms.style="display:none";
    // handleClickOpen();
    CancelBtnHandler();
  };
  const genderHandler = (e) => {
    if (e) {
      let genderValue = e.target.value;

      // let genderName = e.currentTarget.textContent;
      e.preventDefault();

      setFormValues({ ...formValues, sex: genderValue });
      return SetIsRequiredError(genderValue, "genderError", "genderErrorMsg");
    }
  };
  const countryCodeHandler = (e) => {
    ;
    if (e) {
      let countryCodeValue = e.target.value;
      e.preventDefault();

      setFormValues({ ...formValues, countryId: countryCodeValue });
      return SetIsRequiredError(
        countryCodeValue,
        "countryCodeError",
        "countryCodeErrorMsg"
      );
    }
  };

  const QualificationHandler = (e) => {
    if (e) {
      let qualificationValue = e.target.value;
      // let qualificationName = e.currentTarget.textContent;
      e.preventDefault();

      setFormValues({
        ...formValues,
        highestQualification: qualificationValue,
      });
      return SetIsRequiredError(
        qualificationValue,
        "highestQualificationError",
        "highestQualificationErrorMsg"
      );
    }
  };
  const StateHandler = (e) => {
    const stateIds = e.target.value;
    setFormValues({ ...formValues, states: stateIds });
    fetchLGA(stateIds);
  };
  const classes = useStyles();

  const handleChange = (e) => {
    // setDisable(false);
    setFormValues({ ...formValues, courseChoice: e.target.value });
  };

  const applicationForm = React.useRef();

  const applicationDiv = () => {
    if (dataDropDown.length < 0) {
      var applicationForms = document.getElementById("forms");
      var coursechoice = document.getElementById("CourseChoice");
      var applyhere = document.getElementById("ApplyHereBtn");
      applyhere.style = "display:none";
      coursechoice.style = "display:none";
      applicationForms.style = "display:block";
      // if (!ref.current) return;
      // ref.current.scrollIntoView({ behavior: "smooth" });
      var HomePageArea = document.getElementById("HomePage");
      HomePageArea.style = "display:none";
      setSubmitLoader(false);
      // setFormValues({})
    }
  };


  const CancelBtnHandler = () => {
    var HomePageArea = document.getElementById("HomePage");
    var applicationForms = document.getElementById("forms");
    // var applyhere = document.getElementById("ApplyHereBtn");
    // applyhere.style = "display:block";
    HomePageArea.style = "display:flex";
    applicationForms.style = "display:none";
    // setDisable(true);
    setFormStates({ ...initialFormState });
    setFormValues({ ...initialFormValues });
    setFileCV(null);
    setFile(null);
    setIsSubmitted(false);
    setIsPayLater(false);
    setGeneralErrorMsg("");
    setCvFormatMsg("");
    setImageFormatMsg("");
  };
  // const backToHomeHandler = () => {
  //   // var HomePageArea = document.getElementById("HomePage");
  //   // var applicationForms = document.getElementById("forms");
  //   var applyhere = document.getElementById("ApplyHereBtn");
  //   // applyhere.style = "display:block";
  //   // HomePageArea.style = "display:flex";
  //   // applicationForms.style = "display:none";
  //   // setDisable(true);
  //   setFormStates({ ...initialFormState });
  //   setFormValues({ ...initialFormValues });
  //   setIsSubmitted(false);
  //   setFileCV(null);
  //   setFile(null);
  // };

  const validateImage = (e) => {
    setDisplayPicture(null);
    setFile(null);
    const NewImage = e.target.files[0];
    if (NewImage && NewImage !== null) {
      if (!NewImage.name.match(/\.(jpg|jpeg|png)$/)) {
        setImageFormatMsg("Image format must be in jpg, jpeg or png");
        return false;
      } else {
        setImageFormatMsg("");
      }
      if (NewImage.size > 1024000) {
        setImageFormatMsg("*File is too large, Size must be less than 1MB");
        return false;
      } else {
        setImageFormatMsg("");
      }
      setFile(NewImage);
      setDisplayPicture(URL.createObjectURL(NewImage));
    } else {
      setFile(null);
    }
  };

  const passportUploadHandler = (e) => {};

  const onInputChange = (e) => {
    validateImage(e);
  };

  const validateCV = (e) => {
    setCVName(null);
    setFileCV(null);
    const NewCV = e.target.files[0];
    if (NewCV && NewCV != null) {
      if (!NewCV.name.match(/\.(pdf)$/)) {
        setCvFormatMsg("CV format must be in pdf");
        return false;
      } else {
        setCvFormatMsg("");
      }
      if (NewCV.size > 1024000) {
        setCvFormatMsg("File too large", "Size must be less than one megabyte");
        return false;
      } else {
        setCvFormatMsg("");
      }
      setFileCV(NewCV);
      setCVName(URL.createObjectURL(NewCV));
    } else {
      setFile(null);
    }
  };
  const onInputCVChange = (e) => {
    validateCV(e);
  };

  useEffect(() => {
    if (file !== null && file !== undefined) {
      setPictureName(file.name);
      setOpenPictureSection(true);
    }

    return () => {
      setPictureName("");
      setOpenPictureSection(false);
    };
  }, [file]);

  useEffect(() => {
    if (fileCV !== null && fileCV !== undefined) {
      setCVName(fileCV.name);
      setOpenCVSection(true);
    }

    return () => {
      setCVName("");
      setOpenCVSection(false);
    };
  }, [fileCV]);

  const applicationDivWithCourse = (ref) => {
    applicationDiv();
    var coursechoice = document.getElementById("CourseChoice");
    coursechoice.style = "display:block";
    var HomePageArea = document.getElementById("HomePage");
    HomePageArea.style = "display:none";
    var applicationForms = document.getElementById("forms");
    applicationForms.style = "display:block";
  };

  const firstNameHandler = (e) => {
    if (e) {
      e.preventDefault();
      let firstNameValue = e.target.value;
      setFormValues({ ...formValues, firstName: firstNameValue });
      return SetIsRequiredError(
        firstNameValue,
        "firstNameError",
        "firstNameErrorMsg"
      );
    }
  };
  const middleNameHandler = (e) => {
    if (e) {
      e.preventDefault();
      let middleNameValue = e.target.value;
      setFormValues({ ...formValues, middleName: middleNameValue });
    }
  };
  const lastNameHandler = (e) => {
    if (e) {
      e.preventDefault();
      let lastNameValue = e.target.value;
      
      setFormValues({ ...formValues, lastName: lastNameValue });
      return SetIsRequiredError(
        lastNameValue,
        "lastNameError",
        "lastNameErrorMsg"
      );
    }
  };
  const emailAddressHandler = (e) => {
    var emailAddressValue = e.target.value.trim();
    if (e) {
      e.preventDefault();
      setFormValues({ ...formValues, emailAddress: emailAddressValue });
    }

    if (emailAddressValue === "" || emailAddressValue === undefined) {
      setFormStates({
        ...formStates,
        emailAddressError: false,
        emailAddressErrorMsg: "",
      });
      return true;
    }

    if (!validators.isValidEmail(emailAddressValue)) {
      setFormStates({
        ...formStates,
        emailAddressError: true,
        emailAddressErrorMsg:
          "Please enter a valid email or clear your selection",
      });
      return false;
    }
    if (validators.isYahoo(emailAddressValue)) {
      setFormStates({
        ...formStates,
        emailAddressError: true,
        emailAddressErrorMsg: "Please do not enter a yahoo mail or ymail",
      });
      return false;
    }
    setFormStates({
      ...formStates,
      emailAddressError: false,
      emailAddressErrorMsg: "",
    });
    return true;
  };
  const emailAddressConfirmHandler = (e) => {
    let emailAddressConfirmValue = e.target.value.trim();
    if (e) {
      e.preventDefault();
      setFormValues({
        ...formValues,
        emailAddressConfirm: emailAddressConfirmValue,
      });
    }

    if (
      emailAddressConfirmValue === "" ||
      emailAddressConfirmValue === undefined
    ) {
      setFormStates({
        ...formStates,
        emailAddressConfirmError: false,
        emailAddressConfirmErrorMsg: "",
      });
      return true;
    }
    if (
      formValues.emailAddress === "" ||
      formValues.emailAddress === undefined
    ) {
      setFormStates({
        ...formStates,
        emailAddressConfirmError: true,
        emailAddressConfirmErrorMsg: "Kindly fill in the first email!",
      });
      return false;
    }
    if (emailAddressConfirmValue !== formValues.emailAddress) {
      setFormStates({
        ...formStates,
        emailAddressConfirmError: true,
        emailAddressConfirmErrorMsg: "Email Adresses do not match!",
      });
      return false;
    }

    if (!validators.isValidEmail(emailAddressConfirmValue)) {
      setFormStates({
        ...formStates,
        emailAddressConfirmError: true,
        emailAddressConfirmErrorMsg:
          "Please enter a valid email or clear your selection",
      });
      return false;
    }
    if (validators.isYahoo(emailAddressConfirmValue)) {
      setFormStates({
        ...formStates,
        emailAddressConfirmError: true,
        emailAddressConfirmErrorMsg:
          "Please do not enter a yahoo mail or ymail",
      });
      return false;
    }

    setFormStates({
      ...formStates,
      emailAddressConfirmError: false,

      emailAddressConfirmErrorMsg: "",
    });
    return true;
  };
  const phoneNumberHandler = (e) => {
    let phoneNumberValue = e.target.value;
    if (e) {
      e.preventDefault();
      setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      if (phoneNumberValue.charAt(0) === "0") {
        phoneNumberValue = phoneNumberValue.substring(1);
        setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      } else {
        setFormValues({ ...formValues, phoneNumber: phoneNumberValue });
      }
    }
    if (!validators.isPhoneLength(phoneNumberValue)) {
      setFormStates({
        ...formStates,
        phoneNumberError: true,
        phoneNumberErrorMsg:
          "Please enter a valid phone number or clear your selection",
      });

      return false;
    }
    setFormStates({
      ...formStates,
      phoneNumberError: false,
      phoneNumberErrorMsg: "",
    });
    return true;
  };

  const phoneNumberConfirmHandler = (e) => {
    let phoneNumberConfirmValue = e.target.value;
    if (e) {
      e.preventDefault();
      setFormValues({
        ...formValues,
        phoneNumberConfirm: phoneNumberConfirmValue,
      });

      if (phoneNumberConfirmValue.charAt(0) === "0") {
        phoneNumberConfirmValue = phoneNumberConfirmValue.substring(1);
        setFormValues({
          ...formValues,
          phoneNumberConfirm: phoneNumberConfirmValue,
        });
      } else {
        setFormValues({
          ...formValues,
          phoneNumberConfirm: phoneNumberConfirmValue,
        });
      }
    }
    if (formValues.phoneNumber === "" || formValues.phoneNumber === undefined) {
      setFormStates({
        ...formStates,
        phoneNumberConfirmError: true,
        phoneNumberConfirmErrorMsg: "Kindly fill the phone number above",
      });

      return false;
    }
    if (phoneNumberConfirmValue !== formValues.phoneNumber) {
      setFormStates({
        ...formStates,
        phoneNumberConfirmError: true,
        phoneNumberConfirmErrorMsg:
          "Phone number is not similar to the one provided above",
      });

      return false;
    }
    if (!validators.isPhoneLength(phoneNumberConfirmValue)) {
      setFormStates({
        ...formStates,
        phoneNumberConfirmError: true,
        phoneNumberConfirmErrorMsg:
          "Please enter a valid phone number or clear your selection",
      });

      return false;
    }
    setFormStates({
      ...formStates,
      phoneNumberConfirmError: false,
      phoneNumberConfirmErrorMsg: "",
    });
    return true;
  };

  const lgaHandler = (e) => {
    if (e) {
      e.preventDefault();
      let lgaNameValue = e.target.value;
      setFormValues({ ...formValues, lga: lgaNameValue });
      return SetIsRequiredError(lgaNameValue, "lgaError", "lgaErrorMsg");
    }
  };
  const cityHandler = (e) => {
    if (e) {
      e.preventDefault();
      let cityNameValue = e.target.value;
      setFormValues({ ...formValues, city: cityNameValue });
    }
  };
  const courseOfStudyHandler = (e) => {
    if (e) {
      e.preventDefault();
      let courseOfStudyValue = e.target.value;
      setFormValues({ ...formValues, courseOfStudy: courseOfStudyValue });
      return SetIsRequiredError(
        courseOfStudyValue,
        "courseOfStudyError",
        "courseOfStudyErrorMsg"
      );
    }
  };

  const nameOfInstitutionHandler = (e) => {
    if (e) {
      e.preventDefault();
      let nameOfInstitutionValue = e.target.value;
      setFormValues({
        ...formValues,
        nameOfInstitution: nameOfInstitutionValue,
      });
      return SetIsRequiredError(
        nameOfInstitutionValue,
        "nameOfInstitutionError",
        "nameOfInstitutionErrorMsg"
      );
    }
  };

  

  const registerHandler = () => {
    
    setSubmitLoader(true);
    setGeneralErrorMsg("");
    setIsSubmitted(true);
    let formData = new FormData();
    formData.append("ApplicantId", formValues.userid);
    formData.append("FirstName", formValues.firstName);
    formData.append("LastName", formValues.lastName);
    formData.append("MiddleName", formValues.middleName);
    formData.append(
      "PhoneNumber",
      formValues.phoneNumber
    );
    formData.append("CountryCodeId", formValues.countryId);
    formData.append("StateId", formValues.states);
    formData.append("Gender", formValues.sex);
    formData.append("EmailAddress", formValues.emailAddress);
    formData.append("HighestQualification", formValues.highestQualification);
    formData.append("CourseOfHighestQualification", formValues.courseOfStudy);
    formData.append("CourseofChoiceId", formValues.courseChoice);
    formData.append("LGaId", formValues.lga);
    formData.append("City", formValues.city);
    formData.append("passportFilePath", file);
    formData.append("resumeFilePath", fileCV);
    formData.append("NameOfInstitution", formValues.nameOfInstitution);

    if (file === null || fileCV === null) {
      setSubmitLoader(false);
      setGeneralErrorMsg("*All necessary documents must be uploaded");
      return true;
    }
    if (
      formValues.firstName !== "" &&
      formValues.lastName !== "" &&
      formValues.emailAddress !== "" &&
      formValues.emailAddressConfirm !== "" &&
      formValues.phoneNumber !== "" &&
      formValues.phoneNumberConfirm !== "" &&
      formValues.states !== "" &&
      formValues.lga !== "" &&
      formValues.highestQualification !== "" &&
      formValues.courseOfStudy !== "" &&
      formValues.sex !== "" &&
      formValues.courseChoice !== "" &&
      formValues.city !== ""
    ) {
      axios
        .post(
          `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/RegisterApplicant`,
          formData
        )
        .then(function (response) {
          toast.success(response.data.Msg);
          
          setSubmitSuccess(true);
          setResponseFirstName(response.data.Data.FirstName);
          setResponseLastName(response.data.Data.LastName);
          setResponseRegistrationCode(response.data.Data.RegistrationCode);
          setEmailAddressHolder(response.data.Data.EmailAddress)
          setResponseMsg(response.data.Msg);
          setSubmitLoader(false);
          setOpenPay(true);
        })
        .catch(function (error) {
          
         
          toast.error("email address or phone number has been used")
         
        })
        .then(function () { setSubmitLoader(false) });
    } else {
      setSubmitLoader(false);
      setSubmitFailure(false);
      setSubmitSuccess(false);
      setGeneralErrorMsg("*All fields except the middle name are required");
    }
    setSubmitFailure(false);
    setSubmitSuccess(false);
  };

  useEffect(()=>{
    if(submitSuccess ===true && responseMsg !== "" && submitLoader===true ){
      // toast.success(responseMsg);
      setOpenPay(true);
    }
    
  },[submitSuccess,submitLoader,responseMsg])

  useEffect(()=>{
    if(submitFailure === true && responseMsg !=="" && submitSuccess===false){
    // toast.error(responseMsg);
    }
    
  },[submitLoader, submitFailure, responseMsg, submitSuccess])




  const CopyandPasteHandler = (e) => {
    document
      .getElementById("emailTextField")
      .addEventListener("paste", (e) => e.preventDefault());
    document
      .getElementById("emailTextFieldConfirm")
      .addEventListener("paste", (e) => e.preventDefault());
    document
      .getElementById("phoneNumberTextField")
      .addEventListener("paste", (e) => e.preventDefault());
    document
      .getElementById("phoneNumberConfirmTextField")
      .addEventListener("paste", (e) => e.preventDefault());
  };

  //   if(formValues.emailAddressLogin !=="" && formValues.phoneNumberAddressLogin !=="" && formValues.countryCode !==""){
  //     setDisable(false);
  // }
  return (
    <React.Fragment>
      <div style={{backgroundColor:'red !important'}}>
      <CssBaseline className="hello" />
      {loader === true ? (
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <MuiThemeProvider theme={getMuiTheme}>
          <CssBaseline/>
          <AppBar
            position="sticky"
            style={{
              backgroundColor: "#fff",
              height: "90px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Toolbar>
              <img
                className={classes.Logo}
                onClick={logoFunction}
                src={newlogo}
                alt="JM Tech Centre"
                width="130px"
                height="70px"
              />
              {/* <Button
              id="ApplyHereBtn"
              onClick={() => applicationDivWithCourse(applicationForm)}
              className={classes.ApplyHereBtn}
              disableElevation
              variant="outlined"
              color="primary"
            >
              Apply Here
            </Button> */}
            </Toolbar>
          </AppBar>
          <Toolbar id="back-to-top-anchor" />
          <Container >
            <Box my={2}>
              <Grid container spacing={3}>
                <Box
                  className={classes.homePage}
                  id="HomePage"
                  style={{ display: "flex", transition: "all easein 1s" }}
                >
                  <Grid className={classes.grids} item xs={12} sm={12} md={6}>
                    <Paper
                      className={classes.papers}
                      style={{backgroundColor:'#fff'}}
                    >
                      <img
                        className={classes.theImage}
                        src={image2}
                        alt="Home Page"
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} style={{marginBottom:'30px'}}>
                    {isPayLater === true? (
                      <>
                         <Paper className={classes.papers} style={{marginBottom:'10px', paddingBottom:'15px'}}>
                      <h1 style={{ fontSize: "1.5em", margin: "0px" }}>
                       {isSubmitted === false ? (
                          "JM Tech Learning Centre"
                        ) : (
                          <>
                            <span
                              style={{ color: "#9a9a9a", margin: "5px 15px" }}
                            >
                              To complete the registration, a payment link has been sent to your email -
                            </span>
                            <p
                              style={{
                                fontSize: "25px",
                                margin: "20px 0px",
                                fontWeight: "lighter",
                              }}
                            >
                             
                            </p> 
                          </>
                        )}
                    
                      </h1>

                      <h2 style={{ margin: "10px", fontSize: "1.3em" }}>
                        {isSubmitted === true
                          ? "A confirmation mail has been sent to your email"
                          : ""}
                      </h2>
                      {isSubmitted === false ? (
                        <>
                          <h2 style={{ color: "#00a1f1" }}>
                            Microsoft Future Ready Program
                          </h2>

                          <p style={{ fontStyle: "italic", color: "#949494" }}>
                            Please enter the following details to proceed with
                            your application
                            {/* Data Science & AI, Cloud Development, Business
                        Application, Backend Software Development, Frontend
                        Software Development, or Cyber Security */}
                          </p>
                          <FormControl className={classes.margin}>
                            {/* <TextField
                              //   style={{width:'300px'}}
                              type="text"
                              onpaste="return false;"
                              ondrop="return false;"
                              autocomplete="off"
                              id="emailTextField"
                              color="secondary"
                              label="Email Address"
                              value={formValues.emailAddress.toLowerCase()}
                              error={formStates.emailAddressError}
                              helperText={formStates.emailAddressErrorMsg}
                              onFocus={(event) => {
                                CopyandPasteHandler(event);
                              }}
                              onChange={(event) => {
                                emailAddressHandler(event);
                              }}
                              variant="outlined"
                            />
                            <br />
                            <div style={{ display: "flex" }}>
                              <Grid
                                item
                                xs={3}
                                sm={5}
                                md={5}
                                style={{ margin: "0px 10px 0px 0px" }}
                              >
                                <TextField
                                  className={classes.countryCodeText}
                                  color="secondary"
                                  style={{
                                    textAlign: "left",
                                    marginRight: "30px",
                                  }}
                                  id="outlined-select-currency"
                                  select
                                  label="Country Code3"
                                  value={formValues.countryId}
                                  error={formStates.countryCodeError}
                                  helperText={formStates.countryCodeErrorMsg}
                                  onChange={(event) => {
                                    countryCodeHandler(event);
                                  }}
                                  variant="outlined"
                                  // InputLabelProps={{
                                  //     style:{
                                  //         fontSize:'15px'
                                  //     }
                                  // }}
                                  // InputProps={{
                                  //     style: {
                                  //         width:'110px',
                                  //         marginRight:'10px',
                                  //     }
                                  // }}
                                  fullWidth
                                >
                                  {countryCodeDropDown.length > 0 &&
                                    countryCodeDropDown.map((option) => (
                                      <MenuItem
                                        key={option.CountryId}
                                        value={option.CountryId}
                                      >
                                        {"+"}
                                        {option.CountryCode}{" "}
                                        {option.CountryName}
                                      </MenuItem>
                                    ))}
                                </TextField>
                              </Grid>
                              <Grid item xs={9} sm={7} md={7}>
                                <TextField
                                  type="number"
                                  color="secondary"
                                  id="phoneNumberTextField"
                                  label="Phone Number"
                                  value={formValues.phoneNumber}
                                  error={formStates.phoneNumberError}
                                  helperText={formStates.phoneNumberErrorMsg}
                                  onChange={(event) => {
                                    phoneNumberHandler(event);
                                  }}
                                  onFocus={(event) => {
                                    CopyandPasteHandler(event);
                                  }}
                                  fullWidth
                                  variant="outlined"
                                  // fullWidth
                                />
                              </Grid>
                            </div> */}
                            {/* <TextField
                          color="secondary"
                          style={{ width: "100%" }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          label="Choose a course"
                          value={formValues.courseChoice}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          helperText="Please your course of interest"
                          variant="outlined"
                        >
                          {dataDropDown.length > 0 && dataDropDown.map((option) => (
                            <MenuItem
                              key={option.CourseId}
                              value={option.CourseId}
                            >
                              {option.CourseName}
                            </MenuItem>
                          ))}
                        </TextField> */}

                            <Button
                              id="ApplyHereBtn"
                              className={classes.applyNow}
                              //   disabled={disable}
                              onClick={() =>
                                applicationDivWithCourse(applicationForm)
                              }
                              style={{ marginTop: "20px" }}
                              disableElevation
                              variant="contained"
                              color="secondary"
                            >
                              {/* {!loadingForms && <CircularProgress/>} */}
                              {/* {loadingForms && 'Apply Now'}  */}
                              Proceed
                            </Button>
                          </FormControl>
                        </>
                      ) : (
                        
                        <Button
                          // onClick={backToHomeHandler}
                          style={{
                            margin: "20px 0px",
                            textTransform: "capitalize",
                          }}
                          disableElevation
                          variant="contained"
                          color="secondary"
                        >
                          {/* {!loadingForms && <CircularProgress/>} */}
                          {/* {loadingForms && 'Apply Now'}  */}
                          Go Back to Home
                        </Button>
                      )}
                    </Paper>
                      </>
                    ) : (
                    <Paper className={classes.papers} style={{marginBottom:'10px', paddingBottom:'15px'}}>
                      <h1 style={{ fontSize: "1.5em", margin: "0px" }}>
                       {isSubmitted === false ? (
                          "JM Tech Learning Centre"
                        ) : (
                          <>
                            <span
                              style={{ color: "#9a9a9a", margin: "5px 15px" }}
                            >
                              To complete the registration, a payment link has been sent to your email -
                            </span>
                            <p
                              style={{
                                fontSize: "25px",
                                margin: "20px 0px",
                                fontWeight: "lighter",
                              }}
                            >
                              Hello {responseFirstName}, your registration code
                              is <b>{responseRegistrationCode}</b>
                            </p> 
                          </>
                        )}
                    
                      </h1>

                      <h2 style={{ margin: "10px", fontSize: "1.3em" }}>
                        {isSubmitted === true
                          ? "A confirmation mail has been sent to your email"
                          : ""}
                      </h2>
                      {isSubmitted === false ? (
                        <>
                          <h2 style={{ color: "#00a1f1" }}>
                            Microsoft Future Ready Program
                          </h2>

                          <p style={{ fontStyle: "italic", color: "#949494" }}>
                            Please enter the following details to proceed with
                            your application
                            {/* Data Science & AI, Cloud Development, Business
                        Application, Backend Software Development, Frontend
                        Software Development, or Cyber Security */}
                          </p>
                          <FormControl className={classes.margin}>
                          
                          <div style={{display:'flex'}}>
                          <Button
                              id="ApplyHereBtn"
                              className={classes.applyNow}
                              //   disabled={disable}
                              onClick={() =>
                                applicationDivWithCourse(applicationForm)
                              }
                              style={{ marginTop: "20px" }}
                              disableElevation
                              variant="contained"
                              color="secondary"
                            >
                              {/* {!loadingForms && <CircularProgress/>} */}
                              {/* {loadingForms && 'Apply Now'}  */}
                              Start New Application
                            </Button>
                            <Link to="/resumeApplication" style={{textDecoration:'none'}}>
                            <Button
                              className={classes.applyNow}
                              style={{ marginTop: "20px", marginLeft:'20px' }}
                              disableElevation
                              variant="contained"
                              color="primary"
                            >
                              Resume Application
                            </Button>
                            </Link>
                          </div>
                            
                          
                          </FormControl>
                        </>
                      ) : (
                        
                        <Button
                          // onClick={backToHomeHandler}
                          style={{
                            margin: "20px 0px",
                            textTransform: "capitalize",
                          }}
                          disableElevation
                          variant="contained"
                          color="secondary"
                        >
                          {/* {!loadingForms && <CircularProgress/>} */}
                          {/* {loadingForms && 'Apply Now'}  */}
                          Go Back to Home
                        </Button>
                      )}
                    </Paper>

                    )}
                  </Grid>
                </Box>

                <Grid
                  style={{ display: "none" }}
                  id="forms"
                  item
                  xs={12}
                  sm={12}
                >
                  <Paper className={classes.paper}>
                    <FormControl
                      className={classes.forms}
                      noValidate
                      autoComplete="off"
                    >
                      <h2 className={classes.formText}>
                        Application Form For Microsoft Future Ready Program
                      </h2>

                      <h4 style={{ fontStyle: "italic" }}>
                        <span style={{ color: "#fe000067" }}>Note: </span>A
                        payment of <>&#8358;</>30,000.00 will be required to
                        complete this registration
                      </h4>
                      <div>
                        <span style={{ color: "#fe0000" }}>
                          {imageFormatMsg}
                        </span>
                        {openPictureSection ? (
                          <img
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "20%",
                              border: "4px solid #4c4c4c",
                            }}
                            src={displayPicture}
                            alt={pictureName}
                          />
                        ) : (
                          ""
                        )}
                        {/* {openPictureSection ? (
                          <Grid item xs={12}>
                            <DescriptionIcon /> <small> {pictureName} </small>
                          </Grid>
                        ) : (
                          ""
                        )} */}
                        <span className={classes.cvformatError}>
                          {cvFormatMsg}
                        </span>
                        {openCVSection ? (
                          <Grid item xs={12}>
                            <div
                              style={{
                                backgroundColor: "#949494",
                                display: "flex",
                                justifyContent: "flex-start",
                                padding: "0px 0px",
                                borderRadius: "5px",
                                color: "#fff",
                                marginBottom: "10px",
                              }}
                            >
                              <span
                                style={{
                                  margin: "0px 10px 0px 0px",
                                  backgroundColor: "#4c4c4c",
                                  borderRadius: "5px 0px 0px 5px",
                                  padding: "10px 20px",
                                }}
                              >
                                CV File :
                              </span>
                              <span style={{ padding: "5px" }}>
                                <DescriptionIcon /> <small> {CVName} </small>
                              </span>
                            </div>
                          </Grid>
                        ) : (
                          ""
                        )}
                      </div>

                      <div style={{ marginBottom: "20px" }}>
                        <Button
                          className={classes.buttonUploadPhoto}
                          onClick={passportUploadHandler()}
                          disableElevation
                          style={{ marginRight: "15px" }}
                          variant="contained"
                          component="label"
                          color="primary"
                          startIcon={<PhotoCameraIcon />}
                          // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                        >
                          <small>Upload Passport Photo</small>
                          <input
                            type="file"
                            hidden
                            onChange={onInputChange}
                            accept="image/x-png,image/gif,image/jpeg"
                          />
                          {/* <label accept="image/*"></label> */}
                        </Button>

                        <Button
                          disableElevation
                          variant="contained"
                          component="label"
                          color="secondary"
                          startIcon={<CloudUploadIcon />}
                          // style={{ backgroundColor: 'transparent', color: "white", border: "none" }}
                        >
                          <small>Upload CV</small>
                          <input
                            type="file"
                            hidden
                            onChange={onInputCVChange}
                            accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          />
                          {/* <label accept="/*"></label> */}
                        </Button>
                      </div>
                      <div id="CourseChoice">
                        <TextField
                          color="secondary"
                          style={{
                            width: "100%",
                            marginBottom: "20px",
                            textAlign: "left",
                          }}
                          fullWidth
                          id="outlined-select-currency"
                          select
                          label="Learn Track Choice for Program"
                          value={formValues.courseChoice}
                          onChange={handleChange}
                          variant="outlined"
                        >
                          {dataDropDown.map((option) => (
                            <MenuItem
                              key={option.CourseId}
                              value={option.CourseId}
                            >
                              {option.CourseName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </div>

                      <TextField
                        type="text"
                        color="secondary"
                        id="outlined-disabled"
                        label="First Name"
                        value={toTitleCase(formValues.firstName)}
                        error={formStates.firstNameError}
                        helperText={formStates.firstNameErrorMsg}
                        onChange={(event) => {
                          firstNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                      type="text"
                        color="secondary"
                        id="outlined-disabled"
                        label="Middle Name (if applicable)"
                        value={(toTitleCase(formValues.middleName))}
                        onChange={(event) => {
                          middleNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                       onkeyup="this.value = this.value.replace(/[^a-z]/, '')" 
                      type="text"
                        color="secondary"
                        id="outlined-disabled"
                        label="Last Name"
                        value={toTitleCase(formValues.lastName)}
                        error={formStates.lastNameError}
                        helperText={formStates.lastNameErrorMsg}
                        onChange={(event) => {
                          lastNameHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <b style={{ color: "#1a1a1a" }}>
                        *Yahoo mails and Ymails are not allowed
                      </b>
                      <TextField
                        type="text"
                        onpaste="return false;"
                        ondrop="return false;"
                        autocomplete="off"
                        id="emailTextField"
                        color="secondary"
                        label="Email Address"
                        value={formValues.emailAddress.toLowerCase()}
                        error={formStates.emailAddressError}
                        helperText={formStates.emailAddressErrorMsg}
                        onFocus={(event) => {
                          CopyandPasteHandler(event);
                        }}
                        onChange={(event) => {
                          emailAddressHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <TextField
                        color="secondary"
                        id="emailTextFieldConfirm"
                        label="Confirm Email Address"
                        value={formValues.emailAddressConfirm.toLowerCase()}
                        error={formStates.emailAddressConfirmError}
                        helperText={formStates.emailAddressConfirmErrorMsg}
                        onFocus={(event) => {
                          CopyandPasteHandler(event);
                        }}
                        onChange={(event) => {
                          emailAddressConfirmHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          md={3}
                          style={{ margin: "0px 10px 0px 0px" }}
                        >
                          <TextField
                            className={classes.countryCodeText}
                            color="secondary"
                            style={{ textAlign: "left", marginRight: "30px" }}
                            id="outlined-select-currency"
                            select
                            label="Country Code"
                            value={formValues.countryId}
                            error={formStates.countryCodeError}
                            helperText={formStates.countryCodeErrorMsg}
                            onChange={(event) => {
                              countryCodeHandler(event);
                            }}
                            variant="outlined"
                            // InputLabelProps={{
                            //     style:{
                            //         fontSize:'15px'
                            //     }
                            // }}
                            // InputProps={{
                            //     style: {
                            //         width:'110px',
                            //         marginRight:'10px',
                            //     }
                            // }}
                            fullWidth
                          >
                            {countryCodeDropDown.length > 0 &&
                              countryCodeDropDown.map((option) => (
                                <MenuItem
                                  key={option.CountryId}
                                  value={option.CountryId}
                                >
                                  {"+"}
                                  {option.CountryCode} {option.CountryName}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={9} sm={8} md={9}>
                          <TextField
                            type="number"
                            color="secondary"
                            id="phoneNumberTextField"
                            label="Phone Number"
                            value={formValues.phoneNumber}
                            error={formStates.phoneNumberError}
                            helperText={formStates.phoneNumberErrorMsg}
                            onChange={(event) => {
                              phoneNumberHandler(event);
                            }}
                            onFocus={(event) => {
                              CopyandPasteHandler(event);
                            }}
                            fullWidth
                            variant="outlined"
                            // fullWidth
                          />
                        </Grid>
                      </span>
                      <br />
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Grid
                          item
                          xs={4}
                          sm={4}
                          md={3}
                          style={{ margin: "0px 10px 0px 0px" }}
                        >
                          <TextField
                            className={classes.countryCodeText}
                            color="secondary"
                            style={{ textAlign: "left", marginRight: "30px" }}
                            id="outlined-select-currency"
                            select
                            fullWidth
                            label="Country Code"
                            value={formValues.countryId}
                            error={formStates.countryCodeError}
                            helperText={formStates.countryCodeErrorMsg}
                            onChange={(event) => {
                              countryCodeHandler(event);
                            }}
                            variant="outlined"
                            InputLabelProps={{
                              style: {
                                fontSize: "15px",
                              },
                            }}
                            // InputProps={{
                            //     style: {
                            //         width:'110px',
                            //         marginRight:'10px',
                            //     }
                            // }}
                          >
                            {countryCodeDropDown.length > 0 &&
                              countryCodeDropDown.map((option) => (
                                <MenuItem
                                  key={option.CountryId}
                                  value={option.CountryId}
                                >
                                  {"+"}
                                  {option.CountryCode} {option.CountryName}
                                </MenuItem>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item xs={9} sm={8} md={9}>
                          <TextField
                            type="number"
                            color="secondary"
                            id="phoneNumberConfirmTextField"
                            label="Confirm Phone Number"
                            value={formValues.phoneNumberConfirm}
                            error={formStates.phoneNumberConfirmError}
                            helperText={formStates.phoneNumberConfirmErrorMsg}
                            onChange={(event) => {
                              phoneNumberConfirmHandler(event);
                            }}
                            onFocus={(event) => {
                              CopyandPasteHandler(event);
                            }}
                            fullWidth
                            variant="outlined"
                          />
                        </Grid>
                      </span>
                      <br />
                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="Sex"
                        value={formValues.sex}
                        error={formStates.genderError}
                        helperText={formStates.genderErrorMsg}
                        onChange={(event) => {
                          genderHandler(event);
                        }}
                        variant="outlined"
                      >
                        {genders.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="State Of Residence"
                        value={formValues.states}
                        onChange={(e) => {
                          StateHandler(e);
                        }}
                        variant="outlined"
                      >
                        {theState.map((option) => (
                          <MenuItem key={option.StateId} value={option.StateId}>
                            {option.StateName}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        disabled={lgaDisable}
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="LGA Of Residence"
                        value={formValues.lga}
                        error={formStates.lgaError}
                        helperText={formStates.lgaErrorMsg}
                        onChange={(e) => {
                          lgaHandler(e);
                        }}
                        variant="outlined"
                      >
                        {theLga.map((option) => (
                          <MenuItem key={option.LGAId} value={option.LGAId}>
                            {option.LGAName}
                          </MenuItem>
                        ))}
                      </TextField>

                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="City Of Residence"
                        value={formValues.city}
                        onChange={(event) => {
                          cityHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />

                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label" style={{color:'#1a1a1a', textAlign:'left', marginBottom:'15px'}}>
                          Are you currently in school?
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                            onClick={handleChangeAnswer}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                            onClick={handlePickNo}
                          />
                        </RadioGroup>
                      </FormControl>

                      <br />
                      {answer === "yes"?
                      (
                        <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Name Of Institution"
                        value={formValues.nameOfInstitution}
                        error={formStates.nameOfInstitutionError}
                        helperText={formStates.nameOfInstitutionErrorMsg}
                        onChange={(event) => {
                          nameOfInstitutionHandler(event);
                        }}
                        variant="outlined"
                      />
                      )
                      :
                      ""
                      }
                     
                      <br />
                      <TextField
                        color="secondary"
                        style={{ textAlign: "left" }}
                        id="outlined-select-currency"
                        select
                        label="Highest Qualification"
                        value={formValues.highestQualification}
                        onChange={(event) => {
                          QualificationHandler(event);
                        }}
                        variant="outlined"
                      >
                        {qualifications.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <br />
                      <TextField
                        color="secondary"
                        id="outlined-disabled"
                        label="Course of Highest Qualification"
                        value={formValues.courseOfStudy}
                        error={formStates.courseOfStudyError}
                        helperText={formStates.courseOfStudyErrorMsg}
                        onChange={(event) => {
                          courseOfStudyHandler(event);
                        }}
                        variant="outlined"
                      />
                      <br />
                      <span style={{ color: "#fe0000" }}>
                        {generalErrorMsg}
                      </span>
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button
                          onClick={CancelBtnHandler}
                          style={{ marginRight: "20px" }}
                          variant="outlined"
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={registerHandler}
                          style={{ flexGrow: "1" }}
                          variant="contained"
                          color="secondary"
                        >
                          {submitLoader === true ? (
                            <CircularProgress />
                          ) : (
                            "Submit"
                          )}
                          {/* Submit */}
                        </Button>
                        {/* <Button onClick={handleClickPay} variant="outlined" color="primary">
                          Submit 2nd
                        </Button>
                     */}
                        <ToastContainer  />
                      </div>
                    </FormControl>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
          {/* <AuthenticationForm open={open} handleClose={handleClose} /> */}
          <ProceedToPayForm emailAddressHolder={emailAddressHolder} responseFirstName={responseFirstName} responseLastName={responseLastName} openPay={openPay} handleClosePay={handleClosePay} handleClickPayLater={handleClickPayLater}/>
        </MuiThemeProvider>
      )}
      </div>
    </React.Fragment>
  );
}
