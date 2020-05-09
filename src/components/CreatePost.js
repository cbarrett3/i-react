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
        <div className="flex flex-column ph3 mb2 helvetica">
          <div class="flex mb1">
            <textarea 
              id="post"
              name="post" 
              value={this.state.content} 
              placeholder="What's good?" 
              onChange={e => this.setState({ content: e.target.value })} 
              className="db f4 hover-black w-100 measure ba b--white"
              aria-describedby="post-content">
            </textarea> 
            <div class="ph2 lh-copy">
              <span class="f6 db black">Crispy Barrett</span>
              <span class="f6 db gray b">@crispy_101</span>
            </div>
            <img
                src="http://tachyons.io/img/logo.jpg"
                class="br-pill h2-m w2-m h2 w2" alt="avatar">
            </img>
          </div>
          <div class="flex justify-between">
            <div class="measure pr5">
              {/* <label for="name" class="f6 b db mb2">Add Tags <span class="normal black-60">(optional)</span></label> */}
              <input id="name" class="input-reset w-100 ba b--white pv1" type="text" placeholder="Add Tags" aria-describedby="name-desc"/>
              {/* <small id="name-desc" class="f6 black-60 db mb2">Helper text for the form control.</small> */}
            </div>
              <label>
                {/* Audience: */}
                <select priv_post={this.state.priv_post} onChange={this.handleChange}>
                  <option selected priv_post={true}>Private</option>
                  <option priv_post={false}>Public</option>
                </select>
              </label>
          </div>
          <div class="flex justify-between pv3">
            <div>
              <a className='f5 link dim br-pill pv1 ph2 mr2 dib white bg-green helvetica' href='#0'>
                <b>x </b>
                Added Tag
              </a>
              <a className='f5 link dim br-pill pv1 ph2 mr2 dib white bg-green helvetica' href='#0'>
                <b>x </b>
                Added Tag 2
              </a>
            </div>
            <div>
              <Mutation mutation={CREATE_POST_MUTATION} variables={{ content, priv_post }}>
                {createPostMutation => <a  className='f5 link dim br2 ph3 pv2 white bg-pink helvetica' href='#0' onClick={createPostMutation}>Post</a>}
              </Mutation>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default CreatePost