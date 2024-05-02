import React, { Component } from "react";

class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <li>
        <div>
          {message.member}:{message.text}
        </div> 
      </li>
    );
  }
}
export default Message;
