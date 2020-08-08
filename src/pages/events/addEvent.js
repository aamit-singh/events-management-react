import React, { useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Snackbar,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    flexDirection: "column",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: theme.spacing(8),
    padding: theme.spacing(2),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    margin: "1em",
    padding: "1em",
    height: "100%",
    position: "relative",
  },
}));

const AddEvent = (props) => {
  const classes = useStyles();
  const [eventName, seteventName] = useState("name");
  const [eventDescription, seteventDescription] = useState("some event");
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  let history = useHistory();

  const saveEvent = (eventName, eventDescription) => {
    const url = ""; // "http://localhost:5000";
    axios
      .post(url + "/api/addEvent", { eventName, eventDescription })
      .then((res) => {
        history.push("/events/overview");
      })
      .catch((err) => {
        console.log(err.response);
        seterror(true);
        if (typeof err.response.data === String) {
          seterrorMessage(err.response.data);
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
      <Button variant="contained" color="primary">
        <Link to="/events/overview" style={{ color: "white" }}>
          All Events{" "}
        </Link>
      </Button>
      <Paper
        className={classes.paper}
        elevation={3}
        style={{ minHeight: "50vh", width: "90vw" }}
      >
        <div>
          <Typography color="primary" variant="h4" align="left">
            Add Event
          </Typography>
        </div>
        <Paper elevation={0} className={classes.content}>
          <TextField
            variant="outlined"
            name="eventName"
            placeholder="Event Name"
            type="string"
            label="Event Name"
            style={{ margin: "0.5em" }}
            onChange={(event) => {
              seteventName(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            name="eventDiscription"
            placeholder="Event Discription"
            type="string"
            label="Event Discription"
            style={{ margin: "0.5em" }}
            onChange={(event) => {
              seteventDescription(event.target.value);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              saveEvent(eventName, eventDescription);
            }}
            style={{ margin: "0.5em" }}
          >
            Add
          </Button>
        </Paper>
      </Paper>
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

export default AddEvent;
