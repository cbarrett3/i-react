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
        <div className="flex ph3 flex-column">
          <div class="pa1 tr">
            <img
              src="http://tachyons.io/img/logo.jpg"
              class="br-pill h3 w3 dib" alt="avatar"/>
          </div>
          <h1 class="f5 f4-ns fw6 mid-gray">Crispy Barrett</h1>
          <h2 class="f6 gray fw2 ttu tracked">Minneapolis</h2>
          <textarea id="comment"
            name="comment" 
            value={this.state.content} 
            placeholder="What's good?" 
            onChange={e => this.setState({ content: e.target.value })} 
            class="db border-box hover-black w-100 measure ba b--black-20 pa1 br2 mb2" 
            aria-describedby="comment-desc">
          </textarea>
          <label>
            Audience:
            <select priv_post={this.state.priv_post} onChange={this.handleChange}>
              <option selected priv_post={true}>Private</option>
              <option priv_post={false}>Public</option>
            </select>
          </label>
          <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
            {createPostMutation => <a  className='f5 link dim br3 ph2 pv2 mb2 dib white bg-pink' href='#0' onClick={createPostMutation}>Submit</a>}
          </Mutation>
        </div>
      </form>
    )
  }
}

export default CreatePost