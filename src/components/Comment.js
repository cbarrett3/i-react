import React from 'react'
import gql from 'graphql-tag'

// const SHAKA_MUTATION = gql`
//   mutation CreatePostCommentClap($post_comment_id: Int!) {
//     createPostCommentClap(post_comment_id: $post_comment_id) {
//       id
//       created_at
//       content
//       author {
//           id
//           first
//           last
//           username
//         }
//       post_comment_claps {
//         id
//         author {
//           id
//           first
//           last
//           username
//         }
//         post_comment {
//             id
//             created_at
//             content
//             author {
//                 id
//                 first
//                 last
//                 username
//             }
//         }
//         post {
//         id
//         created_at
//         attatchment_url
//         content
//         author {
//           id
//           first
//           last
//           username
//         }
//         post_claps {
//           id
//           author {
//               id
//               first
//               last
//               username
//           }
//         }
//       }
//     }
//   }
// `    
// const DELETE_SHAKA_MUTATION = gql`
//   mutation DeletePostShaka($post_clap_id: Int!, $author_id: Int!) {
//     deletePostClap(post_clap_id: $post_clap_id, author_id: $author_id) {
//       id
//       post {
//         id
//         created_at
//         attatchment_url
//         content
//         author {
//           id
//           first
//           last
//           username
//         }
//         post_claps {
//           id
//           author {
//               id
//               first
//               last
//               username
//           }
//         }
//       }
//     }
//   }
// `

export function Comment(props) {
    // const comments = props.comments;
    // const commentList = comments.map((comment, index) =>
    //   <li key={index}>{comment.content}</li>
    // );
    return (
    //   <ul>{commentList}</ul>
    <div>
        {props &&
            <div className="flex flex-column pt3 pb3 bt b--black-10 helvetica">
                <div className="flex mb2">
                    <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-pill h2-m w2-m h2 w2 mt1 mr1" alt="avatar">
                    </img>
                    <div className="">
                        <span className="f5 db b black mh2">{props.comment.author.first} {props.comment.author.first}</span>
                        <span className="f6 db gray mh2">@{props.comment.author.username}</span>
                    </div>
                    <div className="flex w-90 ml2 ph3 pt2 mt1 br3" style={{backgroundColor: "#dcdcdc"}}>
                        {props.comment.content}
                    </div>
                </div>
            </div>
        }
    </div>
    );
  }