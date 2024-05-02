import React, { Component } from "react";

class MessageForm extends Component {
  state = {
    text: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    // send message
    this.props.onMessageSend({
      text: this.state.text,
      member: "Benz",
    });
  };

  onChange = (e) => {
    this.setState({ text: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.text} onChange={this.onChange} />
        <button>Send</button>
      </form>
    );
  }
}
export default MessageForm;
