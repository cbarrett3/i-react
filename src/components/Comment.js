import React from 'react'
import gql from 'graphql-tag'
import shaka from '../assets/shaka.svg'
import shaka_gold from '../assets/shaka-gold.svg'
import { useMutation } from '@apollo/react-hooks';
import '../styles/Comment.css';

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
    if (props.comment && props.comment.post_comment_claps) {
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
                return deletePostCommentShaka({ variables: { post_comment_clap_id: props.comment.post_comment_claps[i].id, author_id: props.comment.post_comment_claps[i].author.id } })
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
                        {/* <img
                            src="http://tachyons.io/img/logo.jpg"
                            // src = props.user.profilepicurl
                            className="commentAuthorAvatar br-pill" alt="commentAuthorAvator">
                        </img> */}
                        {props.commentModalView === false && props.comment
                            ?
                            <div className="">
                                <span className="f5 db b black mh2">{props.comment.author.first} {props.comment.author.last}</span>
                                <span className="f6 db gray mh2">@{props.comment.author.username}</span>
                            </div>
                            :
                            <div>
                                <img
                                    src="http://tachyons.io/img/logo.jpg"
                                    // src = props.user.profilepicurl
                                    className="commentAuthorAvatar br-pill" alt="commentAuthorAvator">
                                </img>
                                <textarea
                                    id="post"
                                    name="post"
                                    // value={content}
                                    placeholder="Got Juice?"
                                    // onChange={e => setContent(e.target.value)}
                                    className="db f4 hover-black w-60 measure ba b--white ph2"
                                    aria-describedby="post-content">
                                </textarea>
                            </div>
                            // <React.Fragment></React.Fragment>
                        }
                        {props.commentModalView === false &&
                            <div className="flex w-90 ml3 ph3 pt2 mt1 br3" style={{ backgroundColor: "#dcdcdc" }}>
                                {props.comment.content}
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}