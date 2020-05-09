import React, { Component } from 'react'

class Post extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="flex flex-column helvetica bb b--black-10">
          <div class="flex ma3">
            <div class="pa3 w-100">
            {/* db f4 hover-black w-100 measure ba b--white */}
              {this.props.post.content} | 
            </div>
            <div class="lh-copy">
              <span class="f5 db b black">{this.props.post.author.first} {this.props.post.author.last}</span>
              <span class="f6 db gray b">@{this.props.post.author.username}</span>
            </div>
            <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-pill h2-m w2-m h2 w2 mt1" alt="avatar">
            </img>
          </div>
        </div>
      </div>
    )
  }
}

export default Post