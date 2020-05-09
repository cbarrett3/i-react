import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../styles/CreatePost.css';

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
        <div className="flex flex-column ph3 mb1 helvetica">
          <div class="flex mb2">
            {/* <div class="w-50">
            </div> */}
            <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-pill h2-m w2-m h2 w2 mt1 mr1" alt="avatar">
            </img>
            <div class="lh-copy">
              <span class="f5 db b black mh2">Crispy Barrett</span>
              <span class="f6 db gray mh2">@crispy_101</span>
            </div>
              <textarea 
                id="post"
                name="post" 
                value={this.state.content} 
                placeholder="What's good?" 
                onChange={e => this.setState({ content: e.target.value })} 
                className="db f4 hover-black w-60 measure ba b--white ph2"
                aria-describedby="post-content">
              </textarea> 
          </div>
          <div class="flex justify-between">
            <div class="measure ph2">
              <input id="name" class="input-reset w-100 f5 ba b--white" type="text" placeholder="Add Tags" aria-describedby="name-desc"/>
            </div>
            <label>
              <select priv_post={this.state.priv_post} class="select-css" onChange={this.handleChange}>
                <option selected priv_post={true}>Private </option>
                <option priv_post={false}>Public </option>
              </select>
            </label>
          </div>
          <div class="flex justify-between">
            <div>
              <a className='f6 link dim br-pill pv2 ph2 ma1 dib white bg-green helvetica' href='#0'>
                <b>x </b>
                Added Tag
              </a>
            </div>
            <div class="mt3">
              <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
                {createPostMutation => <a  className='f5 link dim br-pill ph3 pv2 white bg-pink helvetica' href='#0' onClick={createPostMutation}>Post</a>}
              </Mutation>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default CreatePost