import React, { Component } from 'react'

class Question extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.question.content} | Response:{this.props.question.response} | Author: {this.props.question.author.first}
        </div>
      </div>
    )
  }
}

export default Question