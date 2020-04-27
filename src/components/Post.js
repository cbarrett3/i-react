import React, { Component } from 'react'

class Post extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.post.content} | Author:{this.props.post.author.first}
        </div>
      </div>
    )
  }
}

export default Post