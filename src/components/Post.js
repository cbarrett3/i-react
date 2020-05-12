import React, { Component } from 'react'
import * as timeago from 'timeago.js';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeago: timeago.format(this.props.post.created_at)
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="flex flex-column pt3 ph3 helvetica bb b--black-10">
          <div className="flex w-100">
            <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-pill h2-m w2-m h2 w2 mr2" alt="avatar">
            </img>
            <a className="link b f5 black pr2" href="#0">
              {this.props.post.author.first} {this.props.post.author.last}
            </a>
            <a className="link f6 gray mr2" href="#0">
              @{this.props.post.author.username} 
            </a>
            <a className="link f6 gray mr2" href="#0">
              &#9642;
            </a>
            <a className="link f6 gray" href="#0">
              {this.state.timeago}
            </a>
          </div>
          <div class="flex w-90 ml4 ph2 pb3">
              {this.props.post.content}
          </div>
        </div>
      </div>
    )
  }
}

export default Post