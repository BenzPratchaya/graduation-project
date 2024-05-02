import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class Count extends Component {
  state = {
    socket: null,
    count: 0,
  };

  componentDidMount() {
    const socket = socketIOClient("http://localhost:3001");

    this.setState({ socket: socket });

    socket.on("count", (data) => this.handleCount(data));
  }

  handleCount = (data) => {
    this.setState({ count: data.count });
  };

  onClick = () => {
    let { socket, count } = this.state;
    count = count + 1;
    this.setState({ count: count });
    socket.emit("emit", { count: count });
  };

  render() {
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.onClick}>Count</button>
      </div>
    );
  }
}

export default Count;
