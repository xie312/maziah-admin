import React, { Component } from "react";
import { TextField, Button, List, ListItem, ListItemText, Paper, Box } from "@material-ui/core";
import { shadows } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

const styles = (theme) => ({
  messageList: {
    flexGrow: 1,
    overflow: "auto",
    margin: "5px",
    display: "none",
  },
  form: {
    margin: "20px",
    display: "flex",
  },
  messageInput: {
    flexGrow: 1,
  },
  submitButton: {
    marginLeft: "10px",
  },
});

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      messages: [],
    };

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.limitToLast(20).on("value", (snapshot) => {
      let newMessages = [];
      snapshot.forEach((child) => {
        var message = child.val();
        newMessages.push({ id: child.key, content: message.content });
      });

      this.setState({ messages: newMessages });

      this.scrollToBottom();
    });
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const content = this.state.content.trim();
    if (content) {
      console.log(`:${content}:`);

      this.messagesRef.push({
        content,
        sentAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      });
    }

    this.setState({ content: "" });
    this.scrollToBottom();
  };

  renderMessages = () => {
    // debugger;

    return this.state.messages.map((message) => (
      <ListItem>
        <Box boxShadow={1} bgcolor="background.paper" p={1}>
          {message.content}
        </Box>
      </ListItem>
    ));
  };

  scrollToBottom = () => {
    this.bottomSpan.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <List className={classes.messageList}>
          {this.renderMessages()}
          <span ref={(el) => (this.bottomSpan = el)} />
        </List>

        <form onSubmit={this.handleSubmit} className={classes.form}>
          <TextField
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="Enter message"
            className={classes.messageInput}
          />
          <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
            Send
          </Button>
        </form>
      </>
    );
  }
}

export default withStyles(styles)(ChatRoom);
