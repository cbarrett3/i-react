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

export function CreateComment(props) {
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
    return (
        <div>
            {props &&
                // <div className="flex flex-column pt3 pb2 helvetica">
                <div className="pt3 pb2 helvetica">
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        // src = props.user.profilepicurl
                        className="commentAuthorAvatar br-pill" alt="commentAuthorAvator">
                    </img>
                    <textarea
                        id="post"
                        name="post"
                        // value={content}
                        placeholder="Comment your reply"
                        // onChange={e => setContent(e.target.value)}
                        className="db f5 hover-black w-60 measure b--none ph3"
                        style={{resize: "none", display: "inline"}}
                        aria-describedby="post-content">
                    </textarea>
                    {props.commentModalView === false &&
                        <div className="flex w-90 ml3 ph3 pt2 mt1 br3" style={{ backgroundColor: "#dcdcdc" }}>
                            {props.comment.content}
                        </div>
                    }
                    <div className="mt4">
                      <a 
                        className='f5 link dim br3 ph3 pv2 white bg-pink helvetica' 
                        style={{backgroundColor: '#fd5956'}}
                        href='#0' 
                        // onClick={() => {createTagsandPostMutation({ variables: { content: content, priv_post: priv_post, tags: tags } })
                        //   setContent('');
                        //   setTags([]);}}
                        >
                        Comment
                      </a>
                      {/* {postSubmitting && <p>Loading...</p>}
                      {postError && <p>Error Submitting...</p>}
                      {newPostAndTagData && console.log(newPostAndTagData[0])} */}
                    </div>
                </div>
            }
        </div>
    );
}