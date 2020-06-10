import React from 'react'
import gql from 'graphql-tag'
import shaka from '../assets/shaka.svg'
import shaka_gold from '../assets/shaka-gold.svg'
import { useMutation } from '@apollo/react-hooks';

const POST_COMMENT_SHAKA_MUTATION = gql`
    mutation CreatePostCommentShaka($post_comment_id: Int!) {
        createPostCommentClap(post_comment_id: $post_comment_id) {
            id
            author {
                id
                first
                last
                username
            }
        }
    }   
`
const DELETE_POST_COMMENT_SHAKA_MUTATION = gql`
  mutation DeletePostCommentShaka($post_comment_clap_id: Int!, $author_id: Int!) {
    deletePostCommentClap(post_comment_clap_id: $post_comment_clap_id, author_id: $author_id) {
      id
    }
  }
`

export function Comment(props) {
    var postCommentShakaAuthorIDs = [0];
    if(props.comment && props.comment.post_comment_claps) {
        props.comment.post_comment_claps.map(shaka =>
            postCommentShakaAuthorIDs = postCommentShakaAuthorIDs.concat(shaka.author.id)
      )
    }
    const [createPostCommentShaka,
        { loading: createPostCommentShakaLoading, error: createPostCommentShakaError },
    ] = useMutation(POST_COMMENT_SHAKA_MUTATION, {
        onCompleted(data) {
        },
        update(cache, data) {
            props.updateCacheAfterPostCommentShakaCreation(cache, data, props.comment.id);
        }
    });
    const [deletePostCommentShaka,
        { loading: deletePostCommentShakaLoading, error: deletePostCommentShakaError },
    ] = useMutation(DELETE_POST_COMMENT_SHAKA_MUTATION, {
        onCompleted(data) {
        },
        update(cache, data) {
            props.updateCacheAfterPostCommentShakaDeletion(cache, data, props.comment.id);
        }
    });
    const findExactPostCommentShakaToDelete = () => {
        var i;
        for (i = 0; i < props.comment.post_comment_claps.length; i++) {
            if (props.comment.post_comment_claps[i].author.id === props.user.id) {
                return deletePostCommentShaka({ variables: { post_comment_clap_id: props.comment.post_comment_claps[i].id, author_id: props.comment.post_comment_claps[i].author.id} })
            }
        }
        return Error
    }
    return (
        //   <ul>{commentList}</ul>
        <div>
            {props &&
                <div className="flex flex-column pt3 pb1 bt b--black-10 helvetica">
                    <div className="flex mb2">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="br-pill h2-m w2-m h2 w2 mt1 mr1" alt="avatar">
                        </img>
                        {props.commentModalView === false && props.comment
                        ?
                        <div className="">
                            <span className="f5 db b black mh2">{props.comment.author.first} {props.comment.author.last}</span>
                            <span className="f6 db gray mh2">@{props.comment.author.username}</span>
                        </div>
                        :
                        <div className="">
                            <span className="f5 db b black mh2">{props.user.first} {props.user.last}</span>
                            {/* <span className="f6 db gray mh2">@{props.user.username}</span> */}
                        </div>
                        }
                        {props.commentModalView === false && 
                            <div className="flex w-90 ml3 ph3 pt2 mt1 br3" style={{ backgroundColor: "#dcdcdc" }}>
                                {props.comment.content}
                            </div>
                        }
                    </div>
                    <div className="tr">
                        <a className="shaka-crop link b f5 black pr2 right" href="#0">
                            {(createPostCommentShakaLoading === false && deletePostCommentShakaLoading === false && props.commentModalView === false)
                                ?
                                (postCommentShakaAuthorIDs.includes(props.user.id) === true)
                                    ?
                                    <img className="shaka-gold" src={shaka_gold} id="shakaed" alt="" onClick={() => { findExactPostCommentShakaToDelete(); }} />
                                    :
                                    <img className="shaka" src={shaka} alt="" id="notshakaed" onClick={() => { createPostCommentShaka({ variables: { post_comment_id: props.comment.id } }); }} />
                                :
                                postCommentShakaAuthorIDs.includes(props.user.id) === true
                                    ?
                                    // {/* <p>delete shaka loading</p> */}
                                    <img className="shaka" src={shaka} alt="" />
                                    :
                                    // {/* <p>loading shaka hasn't happend yet</p> */}
                                    <img className="shaka-gold" src={shaka_gold} alt="" />
                            }
                        </a>
                        {props.commentModalView === false &&
                            <a className="link underline-hover f5 gray right helvetica" style={{ color: "#A8A8A8" }} href="#0">
                                    { createPostCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length + 1 !== 1 && props.comment.post_comment_claps.length + 1 + " shakas"}
                                    { createPostCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length + 1 === 1 && props.comment.post_comment_claps.length + 1 + " shaka"}
                                    { deletePostCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length - 1 !== 1 && props.comment.post_comment_claps.length - 1 + " shakas"}
                                    { deletePostCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length - 1 === 1 && props.comment.post_comment_claps.length - 1 + " shaka"}
                                    { (!deletePostCommentShakaLoading && !createPostCommentShakaLoading) && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length !== 1 && props.comment.post_comment_claps.length + " shakas"}
                                    { (!deletePostCommentShakaLoading && !createPostCommentShakaLoading) && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length === 1 && props.comment.post_comment_claps.length + " shaka"}
                                    {createPostCommentShakaError && console.log(createPostCommentShakaError)}
                                    {deletePostCommentShakaError && console.log(deletePostCommentShakaError)}
                            </a>
                        }   
                    </div>
               </div>
            }
        </div>
    );
}