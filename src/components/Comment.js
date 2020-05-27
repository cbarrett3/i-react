import React from 'react'
import gql from 'graphql-tag'
import shaka from '../images/shaka.svg'
import shaka_gold from '../images/shaka-gold.svg'
import { useMutation } from '@apollo/react-hooks';


const POST_COMMENT_SHAKA_MUTATION = gql`
    mutation CreateCommentShaka($post_comment_id: Int!) {
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
  mutation DeleteCommentShaka($post_clap_id: Int!) {
    deletePostCommentClap(post_comment_clap_id: $post_clap_id) {
      id
    }
  }
`

export function Comment(props) {
    console.log(props)
    var commentShakaAuthorIDs = [0];
    if(props.comment.post_comment_claps) {
        props.comment.post_comment_claps.map(shaka =>
            commentShakaAuthorIDs = commentShakaAuthorIDs.concat(shaka.author.id)
      )
    }
    const [createCommentShaka,
        { loading: createCommentShakaLoading, error: createCommentShakaError },
    ] = useMutation(POST_COMMENT_SHAKA_MUTATION, {
        onCompleted(data) {
        }
    });
    const [deleteCommentShaka,
        { loading: deleteCommentShakaLoading, error: deleteCommentShakaError },
    ] = useMutation(DELETE_POST_COMMENT_SHAKA_MUTATION, {
        onCompleted(data) {
        },
        // update(cache, data) {
        //     props.updateCacheAfterCommentShakaDeletion(cache, data, props.comment.id);
        // }
    });
    const findExactPostCommentShakaToDelete = () => {
        var i;
        for (i = 0; i < props.comment.post_comment_claps.length; i++) {
            if (props.comment.post_comment_claps[i].author.id === props.user.id) {
                deleteCommentShaka({ variables: { post_comment_clap_id: props.comment.post_comment_claps[i].id} })
            }
            else {
                return Error
            }
        }
    }
    // );
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
                        <div className="">
                            <span className="f5 db b black mh2">{props.comment.author.first} {props.comment.author.first}</span>
                            <span className="f6 db gray mh2">@{props.comment.author.username}</span>
                        </div>
                        <div className="flex w-90 ml2 ph3 pt2 mt1 br3" style={{ backgroundColor: "#dcdcdc" }}>
                            {props.comment.content}
                        </div>
                    </div>
                    <div className="tr">
                        <a className="shaka-crop link b f5 black pr2 right" href="#0">
                            {createCommentShakaLoading === false && deleteCommentShakaLoading === false
                                ?
                                (commentShakaAuthorIDs.includes(props.user.id) === true)
                                    ?
                                    <img className="shaka-gold" src={shaka_gold} id="shakaed" alt="" onClick={() => { findExactPostCommentShakaToDelete(); }} />
                                    :
                                    <img className="shaka" src={shaka} alt="" id="notshakaed" onClick={() => { createCommentShaka({ variables: { post_comment_id: props.comment.id } }); }} />
                                :
                                commentShakaAuthorIDs.includes(props.user.id) === true
                                    ?
                                    // {/* <p>delete shaka loading</p> */}
                                    <img className="shaka" src={shaka} alt="" />
                                    :
                                    // {/* <p>loading shaka hasn't happend yet</p> */}
                                    <img className="shaka-gold" src={shaka_gold} alt="" />
                            }
                        </a>
                        <a className="link underline-hover f5 gray right helvetica" style={{ color: "#A8A8A8" }} href="#0">
                                { createCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length + 1 !== 1 && props.comment.post_comment_claps.length + 1 + " shakas"}
                                { createCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length + 1 === 1 && props.comment.post_comment_claps.length + 1 + " shaka"}
                                { deleteCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length - 1 !== 1 && props.comment.post_comment_claps.length - 1 + " shakas"}
                                { deleteCommentShakaLoading && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length - 1 === 1 && props.comment.post_comment_claps.length - 1 + " shaka"}
                                { (!deleteCommentShakaLoading && !createCommentShakaLoading) && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length !== 1 && props.comment.post_comment_claps.length + " shakas"}
                                { (!deleteCommentShakaLoading && !createCommentShakaLoading) && (props.comment.post_comment_claps) && props.comment.post_comment_claps.length === 1 && props.comment.post_comment_claps.length + " shaka"}
                                {createCommentShakaError && console.log(createCommentShakaError)}
                                {deleteCommentShakaError && console.log(deleteCommentShakaError)}
                                {console.log(props.comment)}
                        </a>
                    </div>
                </div>
            }
        </div>
    );
}