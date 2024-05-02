import React, { Component } from "react";
import Message from "./Message";

class MessageList extends Component {
  render() {
    const { messages } = this.props;
    return messages.map((message) => (
      <ul>
        <Message message={message} />
      </ul>
    ));
  }
}
export default MessageList;
