import React, { useState } from "react";
import { TextField, Button, Paper, Typography } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(8),
    padding: theme.spacing(2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  let history = useHistory();

  const handleSubmit = (event) => {
    if (password !== confirmPassword) {
      seterror(true);
      seterrorMessage("password dont match");
    } else {
      const url = ""; // "http://localhost:5000";
      axios
        .post(url + "/api/register", {
          userName,
          userEmail: email,
          password,
        })
        .then((res) => {
          console.log(res.data);
          history.push("/events");
        })
        .catch((err) => {
          console.error(err);
          seterror(true);
          if (typeof err.response.data === String) {
            seterrorMessage(err.response.data);
          }
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterror(false);
  };

  return (
    <div className={classes.center}>
      <Paper className={classes.paper} elevation={3}>
        <Typography color="primary" variant="h3" align="center">
          Register
        </Typography>
        <TextField
          variant="outlined"
          name="userName"
          placeholder="User name"
          type="string"
          label="Username"
          style={{ margin: "0.5em" }}
          onChange={(event) => {
            setuserName(event.target.value);
          }}
        >
          UserName
        </TextField>
        <TextField
          variant="outlined"
          name="userEmail"
          placeholder="Email"
          type="email"
          label="Email"
          style={{ margin: "0.5em" }}
          onChange={(event) => {
            setemail(event.target.value);
          }}
        >
          Email
        </TextField>
        <TextField
          variant="outlined"
          name="password"
          placeholder="password"
          type="password"
          label="Password"
          style={{ margin: "0.5em" }}
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        >
          Password
        </TextField>
        <TextField
          variant="outlined"
          name="password"
          placeholder="confirm password"
          type="password"
          label="Confirm password"
          style={{ margin: "0.5em" }}
          onChange={(event) => {
            setconfirmPassword(event.target.value);
          }}
        >
          Confirm Password
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: "0.5em" }}
        >
          Submit
        </Button>
      </Paper>
      <Typography>
        Already registered? <Link to="/login"> Login </Link>
      </Typography>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="error"
        >
          {errorMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Register;
