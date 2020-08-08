import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Snackbar,
} from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user";

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

const Login = (props) => {
  const classes = useStyles();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const { dispatch } = useContext(UserContext);

  const handleSubmit = (event) => {
    const url = ""; // "http://localhost:5000";
    axios
      .post(url + "/api/login", { userEmail: email, password })
      .then((data) => {
        console.log(data);
        dispatch({ type: "Login", payload: data.config.data });
      })
      .catch((err) => {
        seterror(true);
        if (err.response) {
          console.log(err.response);
          let msg = err.response.statusText;
          msg = msg === "Unauthorized" ? "Wrong username or password" : msg;
          seterrorMessage(msg);
        } else {
          seterrorMessage("server error");
        }
      });
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
          Login
        </Typography>
        <TextField
          variant="outlined"
          name="userEmail"
          placeholder="Email"
          type="email"
          label="User Email"
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
          label="Passord"
          style={{ margin: "0.5em" }}
          onChange={(event) => {
            setpassword(event.target.value);
          }}
        >
          Password
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
        Don't have an accont? <Link to="/register"> Register</Link>
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

export default Login;
