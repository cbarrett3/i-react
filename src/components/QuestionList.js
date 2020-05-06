import React, { Component } from 'react'
import Question from './Question'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const QUESTION_FEED_QUERY = gql`
  {
    questionsFeed {
        id
        created_at
        attatchment_url
        content
        response
        author_id
        author {
            first
            last
        }
        question_comments {
            content
            created_at
            author {
                first
                last
            }
        }
        question_claps {
            id
            author_id
            author {
                first
                last
            }
        }
        question_tags {
            tag {
                tag
            }
        }
    }
 }
`

class QuestionList extends Component {
  render() {
    return (
        <Query query={QUESTION_FEED_QUERY}>
            {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>
                const questionsToRender = data.questionsFeed
                return (
                    <div className="tl">
                        {questionsToRender.map(question => <Question key={question.id} question={question} />)}
                    </div>
                )
            }}
        </Query>
    )
  }
}

export default QuestionList