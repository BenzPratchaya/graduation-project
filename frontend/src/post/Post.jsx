import { React, Component } from "react";
import withRequest from "../lib/withRequest";

class Post extends Component {
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>userId</td>
              <td>Id</td>
              <td>Title</td>
              <td>Body</td>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map((post) => (
              <tr key={post.id}>
                <td>{post.userid}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRequest("https://jsonplaceholder.typicode.com/posts")(Post);
