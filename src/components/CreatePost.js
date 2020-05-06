import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const CREATE_POST_MUTATION = gql`
  mutation PostMutation($content: String!, $priv_post: Boolean) {
    post(content: $content, priv_post: $priv_post) {
      id
      created_at
      content
      priv_post
    }
  }
`

class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      priv_post: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({priv_post: event.target.value});
  }

  handleSubmit(event) {
    alert('Your privacy selection for this post was: ' + this.state.priv_post);
    event.preventDefault();
  }

  render() {
    const { content, priv_post } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="flex ph5 flex-column mt1">
          <input
            type="text"
            className="mb2"
            value={this.state.content}
            onChange={e => this.setState({ content: e.target.value })}
            placeholder="The content of the post"
          />
          <label>
            Audience:
            <select priv_post={this.state.priv_post} onChange={this.handleChange}>
              <option selected priv_post={true}>Private</option>
              <option priv_post={false}>Public</option>
            </select>
          </label>
          <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
            {/* {() => (
              <input type="submit" value="Submit" />
            )} */}
            {createPostMutation => <button onClick={createPostMutation}>Submit</button>}
          </Mutation>
        </div>
          {/* <input type="submit" value="Submit" /> */}
      </form>
    )
  }
}

export default CreatePost