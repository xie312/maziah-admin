import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";

import ChatRoom from "./components/ChatRoom";

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCTtEZAQfoTSIffDE_h0B9yrQOOSTe8cIE",
  authDomain: "notification-603dc.firebaseapp.com",
  databaseURL: "https://notification-603dc.firebaseio.com",
  projectId: "notification-603dc",
  storageBucket: "notification-603dc.appspot.com",
  messagingSenderId: "865117603471",
  appId: "1:865117603471:web:e8045c168e01f5c00c52fa",
  measurementId: "G-DMC6MSJ4TL",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const styles = (theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  appbarTitle: {
    padding: "20px",
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Typography variant="h4" align="center" color="textPrimary" className={classes.appbarTitle}>
            Maziah Admin
          </Typography>
        </AppBar>

        <ChatRoom firebase={firebase} />
      </div>
    );
  }
}

export default withStyles(styles)(App);
