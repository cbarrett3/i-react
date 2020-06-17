import React, { useState } from 'react'
import * as timeago from 'timeago.js'
import comment_icon from '../assets/comment.svg'
import shaka from '../assets/shaka.svg'
import shaka_gold from '../assets/shaka-gold.svg'
import '../styles/Post.css'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Comment } from './Comment'
import { CreateComment } from './CreateComment'
import { Modal } from './Modal'
import {ReactComponent as CommentIcon} from '../assets/comment.svg'
import { CommentSVG } from './Icons/CommentSVG'
import { ReactSVG } from 'react-svg'


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
  const modalContent = (
    <React.Fragment>
      <p>
        Press <code>Esc</code> or click Outside the Modal to exit.
      </p>
      <p>
        Pressing Return also exits the Modal if you haven't changed the focus!
      </p>
    </React.Fragment>
  );
  const commentText = 'add comment'
  const timestamp = timeago.format(props.post.created_at)
  const { data: currentUser } = useQuery(LOGGED_IN_USER);
  const [commentModal, setCommentModal] = useState(false);

  const updateCacheAfterPostCommentShakaDeletion = (cache, data, postCommentID) => {
    props.updateCacheAfterPostCommentShakaDeletion(cache, data, props.post.id, postCommentID)
  }
  const updateCacheAfterPostCommentShakaCreation = (cache, data, postCommentID) => {
    props.updateCacheAfterPostCommentShakaCreation(cache, data, props.post.id, postCommentID)
  }

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
        },
        update(cache, data ) {
          props.updateCacheAfterPostShakaDeletion(cache, data, props.post.id);
        }
  });
  const findExactPostClapToDelete = () => {
    var i;
    for (i = 0; i < props.post.post_claps.length; i++) {
      if(props.post.post_claps[i].author.id === currentUser.getLoggedInUser.id) {
        return deletePostShaka( {variables: { post_clap_id: props.post.post_claps[i].id, author_id: currentUser.getLoggedInUser.id} })
      }
    }
    return Error
  }
  return (
    <div>
      <div className={`flex flex-column pt3 ph3 helvetica bt b--black-10 ${props.commentModalView === false ? "posty" : ""}`}>
        <div className="flex w-100 pb3">
          <img
              src="http://tachyons.io/img/logo.jpg"
              className="avatarr br-pill mr2" alt="avatarr" >
          </img>
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
        <div className="content flex f4 w-90 ml4 ph4">
            {props.post.content}
        </div>
        <div className="flex w-90 ml4 ph4 pb2">
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
        {props.commentModalView === false &&
          <div className="flex justify-between pb3">
            <a className="commentCrop link 5 black pr4 right" href="#0" onClick={() => { setCommentModal(!commentModal)}} >
                {/* <img className="commentIcon" src={comment_icon} alt=""/>&nbsp; <div className="helvetica gray dim" style={{display: "inline", color: "#A8A8A8"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} comments </div> */}
                {/* &nbsp; <div className="helvetica gray dim" style={{display: "inline", color: "#A8A8A8"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} comments </div> */}
                {/* <CommentIcon className="commentIcon" alt="commentIcon"/>&nbsp; <div className="helvetica gray dim" style={{display: "inline", color: "#A8A8A8"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} comments </div> */}
                {/* <ReactSVG src={comment_icon} class="commentIcon"/>&nbsp; <div className="helvetica gray dim" style={{display: "inline", color: "#A8A8A8"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} comments </div> */}
                {/* <CommentSVG/>&nbsp; <div className="comment-count helvetica dim" style={{display: "inline", color: "#A7A7A7"}} onClick={() => { setCommentModal(!commentModal)}} > {props.post.post_comments.length} </div> */}
                {/* <CommentSVG/>&nbsp; */}
                {/* {commentModalView === false
                ? */}
                <React.Fragment>
                  <Modal modalProps={commentText} modalContent={<Post post={props.post} commentModalView={true}></Post>}></Modal>
                  <div className="commentCount">
                    {props.post.post_comments.length}
                  </div>
                </React.Fragment>
            </a>
            <div className="link f5 pr1 helvetica">
              <div className="shakaIcon inline link" href="#0">
                { createShakaLoading === false && deleteShakaLoading === false
                  ?
                    shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true
                      ?
                        <div className="">
                          {/* <p>user shakaed this post</p> */}
                          <img className="shakaGold" src={shaka_gold} id="shakaed" alt="" onClick={() => {findExactPostClapToDelete();}}/>
                          &nbsp;
                          <div className="shakaCount dim pointer">{props.post.post_claps.length}</div>
                        </div>
                      :
                        <div className="">
                          {/* <p>user has not shakaed this post</p> */}
                          <img className="shaka" src={shaka} alt="" id="notshakaed" onClick={() => {createPostShaka({ variables: { post_id: props.post.id } });}}/>
                          &nbsp;
                          <div className="shakaCount dim pointer" >{props.post.post_claps.length}</div>
                        </div>
                  :
                    shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true
                      ?
                        <div className="">
                          {/* <p>delete shaka loading</p> */}
                          <img className="shaka" src={shaka} alt="" />
                          &nbsp;
                          <div className="shakaCount dim pointer" href="#0">{props.post.post_claps.length - 1}</div>
                          {createShakaError && console.log(createShakaError)}
                          {deleteShakaError && console.log(deleteShakaError)}
                        </div>
                      :
                        <div className="">
                          {/* <p>create shaka loading</p> */}
                          <img className="shakaGold" src={shaka_gold} alt="" />
                          &nbsp;
                          <div className="shakaCount dim pointer" href="#0">{props.post.post_claps.length + 1}</div>
                          {createShakaError && console.log(createShakaError)}
                          {deleteShakaError && console.log(deleteShakaError)}
                        </div>
                  } 
              </div>
            </div>
          </div>
        }
        {/* showCommentsModal */}
        {/* {(props.postModalView === true) && 
            <div className="tl">
            {props.post.post_comments.map((comment, index) => <Comment comment={comment} user={currentUser.getLoggedInUser} key={index} updateCacheAfterPostCommentShakaDeletion={updateCacheAfterPostCommentShakaDeletion} updateCacheAfterPostCommentShakaCreation={updateCacheAfterPostCommentShakaCreation}/>)}
          </div>
        } */}
        {/* showCreateCommentModal */}
        {props.commentModalView === true && 
          <div>
            <div className="ml4 ph4 mb3 mt3 gray helvetica">Replying to @{props.post.author.username}</div>
            {/* TODO add updateCommentWithNewComment callback to props */}
            <CreateComment commentModalView={true} user={currentUser.getLoggedInUse}/>
            {/* <Comment commentModalView={true} user={currentUser.getLoggedInUser}/> */}
          </div>
        }
      </div>
    </div>
  )
}
export default Post