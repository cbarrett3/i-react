import React, { useState } from 'react'
import * as timeago from 'timeago.js';
import comment_icon from '../images/comment.svg'
import shaka from '../images/shaka.svg'
import shaka_gold from '../images/shaka-gold.svg'
import '../styles/Post.css';
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Comment } from './Comment'

export const LOGGED_IN_USER = gql`
  {
    getLoggedInUser @client {
      id
      first
      last
      username
      profile_pic_url
    }
  }
`
const SHAKA_MUTATION = gql`
  mutation CreatePostShaka($post_id: Int!) {
    createPostClap(post_id: $post_id) {
      id
      post {
        id
        created_at
        attatchment_url
        content
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
      }
    }
  }
`
const DELETE_SHAKA_MUTATION = gql`
  mutation DeletePostShaka($post_clap_id: Int!, $author_id: Int!) {
    deletePostClap(post_clap_id: $post_clap_id, author_id: $author_id) {
      id
      post {
        id
        created_at
        attatchment_url
        content
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
      }
    }
  }
`
function Post(props) {
  const timestamp = timeago.format(props.post.created_at)
  const { data: currentUser } = useQuery(LOGGED_IN_USER);
  const [commentModal, setCommentModal] = useState(false);
  var shakaAuthorIDs = [];
  if(props.post.post_claps) {
    props.post.post_claps.map(shaka =>
      shakaAuthorIDs = shakaAuthorIDs.concat(shaka.author.id)
    )
  }

  const [ createPostShaka,
    { loading: createShakaLoading, error: createShakaError },
  ] = useMutation(SHAKA_MUTATION, {
        onCompleted(data) {
        }
      });
  const [ deletePostShaka,
    { loading: deleteShakaLoading, error: deleteShakaError },
  ] = useMutation(DELETE_SHAKA_MUTATION, {
        onCompleted(data) {
          console.log("done")
        },
        update(cache, data ) {
          props.updateCacheAfterShakaDeletion(cache, data, props.post.id);
        }
      });
  const findExactPostClapToDelete = () => {
    var i;
    console.log(props.post.post_claps)
    for (i = 0; i < props.post.post_claps.length; i++) {
      console.log(props.post.post_claps[i].author.id)
      console.log(currentUser.getLoggedInUser.id)
      if(props.post.post_claps[i].author.id === currentUser.getLoggedInUser.id) {
        return deletePostShaka( {variables: { post_clap_id: props.post.post_claps[i].id, author_id: currentUser.getLoggedInUser.id} })
      }
    }
    return Error
  }
  return (
    <div>
      <div className="flex flex-column pt3 ph3 helvetica bb b--black-10 posty">
        <div className="flex w-100 pb3">
          <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-pill h2-m w2-m h2 w2 mr2" alt="avatar">
          </img>
          {/* <a className="link b f5 black" href="#0">
            {props.post.author.first} {props.post.author.last} 
          </a>
          <a className="link f6 gray ml2 mr2" href="#0">
            @{props.post.author.username} 
          </a> */}
          <div className="">
            <span className="f5 db b black mh2">{props.post.author.first} {props.post.author.last}</span>
            <span className="f6 db gray mh2">@{props.post.author.username}</span>
          </div>
          <a className="link f6 gray mr2" href="#0">
            &#9642;
          </a>
          <a className="link f6 gray" href="#0">
            {timestamp}
          </a>
        </div>
        <div className="flex w-90 ml4 ph3 pb1">
            {props.post.content}
        </div>
        <div className="flex w-90 ml4 ph2 pb3">
            { props.post.post_tags.length > 0
              ? 
              <div>
                <div className="" id="tags">
                  <ul style={{listStyle: "none", padding: "0"}}>
                    {props.post.post_tags.map((tag, index) =>
                      <li className="pb2 mt3" key={index}  style={{float: "left", display: "inline-block"}}>
                        <a className='f6 link dim br3 ph3 pv2 mr1 white bg-green helvetica' href='#0'>
                          {tag.tag.tag}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div> 
              : 
                <div></div>
            }
        </div>
        <div className="flex justify-between mt2 mb1">
          <a className="comment-crop link 5 black pr4 right" href="#0">
              <img className="dim" src={comment_icon} alt=""/>&nbsp; <div className="helvetica gray underline-hover" style={{display: "inline", color: "#A8A8A8"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} comments </div>
          </a>
          <div>
            <a className="shaka-crop link b f5 black pr2 right" href="#0">
              { createShakaLoading === false && deleteShakaLoading === false
                ?
                  (shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true)
                    ?
                      <img className="shaka-gold" src={shaka_gold} id="shakaed" alt="" onClick={() => {findExactPostClapToDelete();}}/>
                    :
                      <img className="shaka" src={shaka} alt="" id="notshakaed" onClick={() => {createPostShaka({ variables: { post_id: props.post.id } });}}/>
                :
                  shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true
                    ?
                      // {/* <p>delete shaka loading</p> */}
                      <img className="shaka" src={shaka} alt="" />
                    :
                      // {/* <p>loading shaka hasn't happend yet</p> */}
                      <img className="shaka-gold" src={shaka_gold} alt="" />
              }
            </a>
            <a className="link underline-hover f5 gray right helvetica" style={{color: "#A8A8A8"}} href="#0">
              { createShakaLoading && (props.post.post_claps) && props.post.post_claps.length + 1 !== 1 && props.post.post_claps.length + 1 + " shakas"}
              { createShakaLoading && (props.post.post_claps) && props.post.post_claps.length + 1 === 1 && props.post.post_claps.length + 1 + " shaka"}
              { deleteShakaLoading && (props.post.post_claps) && props.post.post_claps.length - 1 !== 1 && props.post.post_claps.length - 1 + " shakas"}
              { deleteShakaLoading && (props.post.post_claps) && props.post.post_claps.length - 1 === 1 && props.post.post_claps.length - 1 + " shaka"}
              { (!deleteShakaLoading && !createShakaLoading) && (props.post.post_claps) && props.post.post_claps.length !== 1 && props.post.post_claps.length + " shakas"}
              { (!deleteShakaLoading && !createShakaLoading) && (props.post.post_claps) && props.post.post_claps.length === 1 && props.post.post_claps.length + " shaka"}
              {createShakaError && console.log(createShakaError)}
              {deleteShakaError && console.log(deleteShakaError)}
            </a>
          </div>
        </div>
        {(commentModal === true) && 
          <div className="tl">
            {props.post.post_comments.map((comment, index) => <Comment comment={comment} user={currentUser.getLoggedInUser} key={index}/>)}
          </div>
        }
      </div>
    </div>
  )
}
export default Post