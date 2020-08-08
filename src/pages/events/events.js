import React, { useState, useEffect, useContext } from "react";
import { Button, Paper, Typography, Snackbar, Grid } from "@material-ui/core";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
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
  eventsBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  event: {
    display: "flex",
    flexDirection: "row",
    padding: "0.2em",
    margin: "0.2em",
    backgroundColor: "aliceblue",
  },
}));

const Events = (props) => {
  const classes = useStyles();
  const [events, setevents] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, seterror] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const { user } = useContext(UserContext);
  useEffect(() => {
    const url = ""; // "http://localhost:5000";
    axios
      .get(url + "/api/events")
      .then((res) => {
        setevents(res.data.events);
        setisLoading(false);
      })
      .catch((err) => {
        seterror(true);
        if (typeof err.response.data === String) {
          seterrorMessage(err.response.data);
        }
      });
  }, [user]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterror(false);
  };

  return (
    <div className={classes.center}>
      <Paper
        className={classes.paper}
        elevation={3}
        style={{ minHeight: "50vh", width: "90vw" }}
      >
        <div className={classes.eventsBar}>
          <Typography color="primary" variant="h3" align="left">
            Events
          </Typography>
          <Button
            variant="contained"
            color="primary"
            align="right"
            style={{ margin: "0.7em" }}
          >
            <Link to="/events/addEvent" style={{ color: "white" }}>
              {" "}
              Add Event
            </Link>
          </Button>
        </div>
        <Paper elevation={0} className={classes.content}>
          {events.length > 0 ? (
            events.map((event, index) => {
              return (
                <Paper key={index} className={classes.event}>
                  <Grid container>
                    <Grid item md={3} lg={3}>
                      <Typography align="left" style={{ padding: "0em 1em" }}>
                        {"Name: "}
                        {event.name}
                      </Typography>
                    </Grid>
                    <Grid item md={9} lg={9}>
                      <Typography align="left">
                        {"Discription: "}
                        {event.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })
          ) : isLoading === true ? (
            ""
          ) : (
            <Typography variant="h5" align="left">
              No Events
            </Typography>
          )}
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

export default Events;
