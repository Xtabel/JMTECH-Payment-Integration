import React, { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper, Button, CircularProgress, Box } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import patternbg from "../assets/patternbg.png";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";

const getMuiTheme = createTheme({
  palette: {
    secondary: { main: "#1a1a1a" },
    primary: { main: "#fe0000" },
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
          backgroundImage: `url(${patternbg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        },
      },
      "@media screen and (max-width:450px)": {
        body: {
          backgroundImage: `url(${patternbg})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        },
      },
    },

    MuiGrid: {
      container: {
        display: "block",
      },
    },
    "& body": {
      backgroundColor: "red !important",
    },
  },
});

const SuccessfulPayment = () => {
  const location = useLocation();
  const emailAddress = location.email;
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const refcode = searchParams.get("reference");
  const [state, setState] = useState(null);
  const [loader, setLoader] = useState(true);
  const verifyPayment = async (reference) => {
    setLoader(true);
    try {
      await axios
        .get(
          `https://www.waeconline.org.ng/JMTechAPI/api/Applicant/VerifyPayment?Reference=${refcode}`
        )
        .then(function (response) {
          setLoader(false);
          console.log(response);
          if (response.data) {
            setState(response.data.State);
          }
        })
        .catch(function (error) {
          setState(0);
        })
        .then(function () {
          setLoader(false);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (refcode !== null || (refcode !== "" && state !== null)) {
      verifyPayment();
    }
  }, [setState]);
  return (
    <MuiThemeProvider theme={getMuiTheme}>
      {loader === true ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <CssBaseline />
          <Container maxWidth="xl">
            <Box my={2} style={{ height: "100vh" }}>
              <Paper
                elevation={0}
                style={{ textAlign: "center", paddingTop: "50px" }}
              >
                {state === 1 ? (
                  <>
                    <h1 style={{ color: "#4BB543" }}>Congratulations!</h1>
                    <h3 style={{ color: "#1a1a1a95", fontWeight: "500" }}>
                      Your Payment{emailAddress} is successful, check the{" "}
                      <span style={{ color: "#1a1a1a", fontWeight: "700" }}>
                        email address
                      </span>{" "}
                      you used to register to get your registration code.
                    </h3>
                    <br />
                    <br />
                    <Link style={{ textDecoration: "none" }} to="/">
                      <Button
                        color="secondary"
                        style={{ textTransform: "capitalize" }}
                        variant="contained"
                        disableElevation
                      >
                        Go Back Home
                      </Button>
                    </Link>
                    '
                  </>
                ) : state === 0 ? (
                  <>
                    <h1 style={{ color: "#4BB543" }}>
                      Unable to Process Transaction
                    </h1>
                    <h3 style={{ color: "#1a1a1a95", fontWeight: "500" }}>
                      Your Payment{emailAddress} was not successful,{" "}
                      <Link to="/resumeApplication">try again.</Link>
                    </h3>
                  </>
                ) : (
                  <>
                    <h1 style={{ color: "#4BB543" }}>
                      <CircularProgress color="secondary" />
                    </h1>
                  </>
                )}
              </Paper>
            </Box>
          </Container>
        </>
      )}
    </MuiThemeProvider>
  );
};

export default SuccessfulPayment;
