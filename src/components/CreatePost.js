// import React, { Component } from 'react'

// const POST_MUTATION = gql`
//   mutation PostMutation($content: String!, $attatchment_url: String!,  $priv_post: Boolean) {
//     post(content: $content, attatchment_url: $attatchment_url, priv_post: $priv_post) {
//       id
//       createdAt
//       url
//       description
//     }
//   }

// class CreatePost extends Component {
//   state = {
//     content: '',
//     attatchment_url: '',
//     priv_post: Boolean, 
//   }

//   render() {
//     const { content, attatchment_url, priv_post } = this.state
//     return (
//       <div>
//         <div className="flex flex-column mt3">
//           <input
//             className="mb2"
//             value={content}
//             onChange={e => this.setState({ content: e.target.value })}
//             type="text"
//             placeholder="content of the post"
//           />
//           <input
//             className="mb2"
//             value={attatchment_url}
//             onChange={e => this.setState({ attatchment_url: e.target.value })}
//             type="text"
//             placeholder="The URL for an optional post attatchment"
//           />
//          <input
//             className="mb2"
//             value={priv_post}
//             onChange={e => this.setState({ priv_post: e.target.value })}
//             type="text"
//             placeholder="Boolean for whether or not post is private"
//           />
//      </div>
//         <button onClick={`... you'll implement this 🔜`}>Submit</button>
//       </div>
//     )
//   }
// }

// export default CreateLink