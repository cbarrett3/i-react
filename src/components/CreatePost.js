import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag'
import '../styles/CreatePost.css';
import { POST_FEED_QUERY } from './PostList'

const CREATE_POST_AND_TAGS_MUTATION = gql`
  mutation CreateTagsandPostMutation($tags: [String], $content: String!, $priv_post: Boolean) {
    createTags(tags: $tags) {
      id 
      tag                              
    },
    createPost(content: $content, priv_post: $priv_post) {
      id
      content
      priv_post
    }
  }
`
const CREATE_POST_TAG_MAPPING_MUTATION = gql`
  mutation CreatePostTagsMappingMutation($post_id: Int, $tag_ids: [Int]) {
    createPostTags(post_id: $post_id, tag_ids: $tag_ids) {
      id
      tag {
        id
        tag
      }
      post {
        id
        content
        created_at
        attatchment_url
        author {
        id
        first
        last
        username
        }
        post_claps {
          id
          author {
              id
              first
              last
              username
          }
        }
        post_comments {
          id
          content
          created_at
          author {
              id
              first
              last
              username
          }
        }
        post_tags {
          tag {
              id
              tag
          }
        }
      }
    }
 }
`
export const LOGGED_IN_USER = gql`
  {
    getLoggedInUser {
      id
      first
      last
      username
      profile_pic_url
    }
  }
`

function CreatePost(props) {
    const [content, setContent ] = useState('')
    const [priv_post, setPriv_Post ] = useState(false)
    const [tag, setTag ] = useState('')
    const [tags, setTags] = useState([])

    /* mutation for when a post is submitted */
    const [
      createTagsandPostMutation,
      { data: newPostAndTagData, loading: postSubmitting, error: postError },
    ] = useMutation(CREATE_POST_AND_TAGS_MUTATION, {onCompleted(data) {
        if(data) {
          const postedID = data.createPost.id
          const taggedIDs = data.createTags.map(tag =>
                tag.id
          )
          setTimeout( function(){
            createPostTagsMappingMutation({ variables: { post_id: postedID, tag_ids: taggedIDs } } )
          }, 1500 );
        }
      }},
      // {update(cache, { data: { post } }) {
      //   const data = cache.readQuery({ query: POST_FEED_QUERY })
      //   data.postsFeed.unshift(post)
      //   cache.writeQuery({
      //     query: POST_FEED_QUERY,
      //     data
      //   })
      // }}
    );

    /* mutation for mapping post_id and tag_ids  */
    const [
      createPostTagsMappingMutation,
    ] = useMutation(CREATE_POST_TAG_MAPPING_MUTATION, 
      {update(cache, { data: { post } }) {
        const feedFromCache = cache.readQuery({ query: POST_FEED_QUERY })
        if(feedFromCache) {
          const updatedFeed = feedFromCache.postsFeed.unshift(post)
          cache.writeQuery({
            query: POST_FEED_QUERY,
            updatedFeed
          })
        }
      }}
    );

    /* remove tag when clicked */
    const removeTag = (tag) => {
      var index = (tags.indexOf(tag))
      var newTags = tags.slice(0,index).concat(tags.slice(index+1))
      setTags(newTags)
    }
    return (
      <Query query={LOGGED_IN_USER}>
        {({ loading, error, data }) => {
          if (loading) return <div className="mb6 tc gray">loading</div>
          if (error) return <div>Error</div>
          const user = data.getLoggedInUser
          return (
            <div className="flex flex-column ph3 mb1 helvetica">
              <div className="flex mb2">
                <img
                  src="http://tachyons.io/img/logo.jpg"
                  className="avatar br-pill" alt="avatar">
                </img>
                <div className="">
                  <span className="f5 db b black ph2">{user.first} {user.last}</span>
                  <span className="f6 db gray mh2">@{user.username}</span>
                </div>
                <textarea
                  id="post"
                  name="post"
                  value={content}
                  placeholder="Got Juice?"
                  onChange={e => setContent( e.target.value )}
                  className="db f4 hover-black w-60 measure ba b--white ph2"
                  aria-describedby="post-content">
                </textarea>
              </div>
              <div className="flex justify-between">
                <div className="">
                    <input className="input-reset f5 ba b--white" onChange={e => setTag( e.target.value )} type="text" placeholder="Add Tag" id="tag-input" aria-describedby="name-desc" />
                    {tag !== '' && (
                          <a className="link flex" type="button" href="#0">
                            <h1 className="f6 fw6 ttu tracked green" onClick={() => { setTags([ ...tags, tag]); setTag(''); document.getElementById('tag-input').value = ''}}> Add Tag</h1>
                          </a>
                    )}
                </div>
                <div>
                  <label className="">
                    <select className="select-css" onChange={e => setPriv_Post( e.target.value )}>
                      <option defaultValue priv_post="false">Public</option>
                      <option priv_post="true">Private </option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="" id="tags">
                  <ul style={{listStyle: "none", padding: "0"}}>
                    {tags.map((tag, index) =>
                      <li className="pb2 mt3" style={{float: "left", display: "inline-block"}} onClick={() => { removeTag(tag)}} key={index}>
                        <a className='f5 link dim br3 ph3 pv2 mr1 white bg-green helvetica' href='#0'>
                           <b> x </b> {tag}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="mt4">
                      <a 
                        className='f5 link dim br3 ph3 pv2 white bg-pink helvetica' 
                        style={{backgroundColor: '#fd5956'}}
                        href='#0' 
                        onClick={() => {createTagsandPostMutation({ variables: { content: content, priv_post: priv_post, tags: tags } })
                          setContent('');
                          setTags([]);}}>
                        Post
                      </a>
                      {postSubmitting && <p>Loading...</p>}
                      {postError && <p>Error Submitting...</p>}
                      {newPostAndTagData && console.log(newPostAndTagData[0])}
                </div>
              </div>
            </div>
          )
        }}
      </Query>
    )
}
export default CreatePost