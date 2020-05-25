import React, { useState } from 'react'
import * as timeago from 'timeago.js';
import comment_icon from '../images/comment.svg'
import shaka from '../images/shaka.svg'
import shaka_gold from '../images/shaka-gold.svg'
import '../styles/Post.css';
import gql from 'graphql-tag'
import { useMutation, useQuery, readQuery } from '@apollo/react-hooks';

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
  // automatically updates after shaka shakas but doen't change on delete shaka...
  const shakaAuthorIDs = props.post.post_claps.map(shaka =>
    shaka.author.id
  )
  const [ shakaed, setShakaed ] = useState((shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true))
  const [ shakaCount, setShakaCount ] = useState(props.post.post_claps.length)
  // const {shakaed: setShakaed } = useState(false)

  // check if author did or not
  // const userShakaed = () => {
  //   if(shakaAuthorIDs) {
  //     console.log(shakaAuthorIDs)
  //     if(shakaAuthorIDs.includes(currentUser.getLoggedInUser.id)) {
  //       console.log("true")
  //       return true
  //     }
  //   }
  //   else {
  //     console.log("false")
  //     return false
  //   }
  // }

  const [ createPostShaka,
    { client, loading: createShakaLoading, error: createShakaError },
  ] = useMutation(SHAKA_MUTATION, {
    onCompleted(data) {
      // sup
        console.log("hola")
    }
  });

  const [ deletePostShaka,
    { loading: deleteShakaLoading, error: deleteShakaError },
  ] = useMutation(DELETE_SHAKA_MUTATION, {
        onCompleted(data) {
          // sup
        },
        update(cache, data ) {
          console.log(data.data)
          props.updateCacheAfterShakaDeletion(cache, data, props.post.id);
        }
      }
    );
  
  const findExactPostClapToDelete = () => {
    var i;
    for (i = 0; i < props.post.post_claps.length; i++) {
      if(props.post.post_claps[i].author.id === currentUser.getLoggedInUser.id) {
        deletePostShaka( {variables: { post_clap_id: props.post.post_claps[i].id, author_id: currentUser.getLoggedInUser.id} })
      }
    }
  }

  // const updateCache = (cache, {data}) => {
  //   // If this is for the public feed, do nothing
  //   console.log(data)
  //   var updatedPostShakas = data.createPostClap.post.post_claps
  //   var shaka_authors = updatedPostShakas.map(shaka =>
  //     shaka.author.id
  //   )
  //   if(shaka_authors.includes(currentUser.getLoggedInUser.id)) {
  //     console.log("it's true")
  //     return setUserShakaed(true)
  //   }
  //   else {
  //     console.log("it's false")
  //     return setUserShakaed(false)
  //   }
  // };

  return (
    <div>
      <div className="flex flex-column pt3 ph3 helvetica bb b--black-10 pointer posty">
        <div className="flex w-100">
          <img
              src="http://tachyons.io/img/logo.jpg"
              className="br-pill h2-m w2-m h2 w2 mr2" alt="avatar">
          </img>
          <a className="link b f5 black pr2" href="#0">
            {props.post.author.first} {props.post.author.last}
          </a>
          <a className="link f6 gray mr2" href="#0">
            @{props.post.author.username} 
          </a>
          <a className="link f6 gray mr2" href="#0">
            &#9642;
          </a>
          <a className="link f6 gray" href="#0">
            {timestamp}
          </a>
        </div>
        <div className="flex w-90 ml4 ph2 pb1">
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
        <div className="tr">
          <a className="comment-crop link dim b f5 black pr4 right" href="#0">
              <img src={comment_icon} alt=""/>
          </a>
          <a className="shaka-crop link b f5 black pr2 right" href="#0">
            { createShakaLoading === false && deleteShakaLoading === false
              ?
                // {/* { (shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true) */}
                [ (shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true)
                  ?
                    <img src={shaka_gold} id="shakaed" alt="" onClick={() => {findExactPostClapToDelete(); setShakaed(false)}}/>
                  :
                    // <img src={shaka} alt="" id="notshakaed" onClick={() => {document.getElementById('notshakaed').src = {shaka_gold}; createPostShaka({ variables: { post_id: props.post.id } }); setShakaed(true)}}/>
                    <img src={shaka} alt="" id="notshakaed" onClick={() => {createPostShaka({ variables: { post_id: props.post.id } }); setShakaed(true)}}/>
                ]
                // <div>hi</div>
              :
                [ shakaAuthorIDs.includes(currentUser.getLoggedInUser.id) === true
                  ?
                      // {/* <p>delete shaka loading</p> */}
                      <img src={shaka} alt="" />
                  :
                      // {/* <p>loading shaka hasn't happend yet</p> */}
                      <img src={shaka_gold} alt="" />
                ] 
            }
          </a>
          <a className="link dim f5 gray right helvetica" href="#0">
            { createShakaLoading && (props.post.post_claps) && props.post.post_claps.length + 1 }
            { deleteShakaLoading && (props.post.post_claps) && props.post.post_claps.length - 1 }
            { (!deleteShakaLoading && !createShakaLoading) && (props.post.post_claps) && props.post.post_claps.length }
          </a>
        </div>
      </div>
    </div>
  )
}
export default Post