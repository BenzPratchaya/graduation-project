import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import { Navigate } from "react-router-dom";

class Chatroom extends Component {
  state = {
    messages: [
      { text: "Hi", member: "FutureSkill" },
      { text: "Hi", member: "Mark" },
      { text: "Good Bye", member: "FutureSkill" },
      { text: "Bye", member: "Mark" },
    ],
  };

  onMessageSend = (message) => {
    this.setState({ messages: [...this.state.messages, { ...message }] });
  };

  render() {

    return (
      <div>
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.onMessageSend} />
      </div>
    );
  }
}

export default Chatroom;
