import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialContainerBackground = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialContainer: initialContainerBackground,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        deleteComment={this.deleteComment}
        isLikedButton={this.isLikedButton}
      />
    ))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  isLikedButton = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="app-container">
          <h1 className="heading">Comments</h1>
          <div className="form-container">
            <form className="form" onSubmit={this.onSubmitComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="input-text"
                placeholder="Your Name"
                onChange={this.onChangeNameInput}
                value={nameInput}
              />
              <textarea
                rows="8"
                className="text-area"
                onChange={this.onChangeCommentInput}
                value={commentInput}
                placeholder="Your Comment"
              />
              <button className="button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr className="line" />
          <p className="comment-head">
            <span className="count">{commentsList.length}</span>Comments
          </p>
          <ul className="comments-list-container">
            {this.renderCommentsList()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
