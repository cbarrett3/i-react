import React from 'react'

export function Comment(props) {
    const comments = props.comments;
    const commentList = comments.map((comment, index) =>
      <li key={index}>{comment.content}</li>
    );
    return (
      <ul>{commentList}</ul>
    );
  }