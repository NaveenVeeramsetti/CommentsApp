// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, deleteComment, isLikedButton} = props
  const {id, name, comment, date, isLiked, initialContainer} = commentDetails
  const initialName = name ? name[0].toUpperCase() : ''
  const postedTime = formatDistanceToNow(date)
  const likeTextClassName = isLiked
    ? 'active like-button'
    : 'not-active like-button'
  const likeButton = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const onClickDeleteButton = () => {
    deleteComment(id)
  }

  const onClickLikeButton = () => {
    isLikedButton(id)
  }

  return (
    <li className="comments-list-items">
      <div className="comment-name-container">
        <div className={initialContainer}>
          <p className="initial">{initialName}</p>
        </div>
        <div>
          <div className="name-date-container">
            <p className="name">{name}</p>
            <p className="date">{postedTime}</p>
          </div>
          <p className="comment-description">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete-container">
        <div className="like-container">
          <img src={likeButton} alt="like" className="like-image" />
          <button
            className={likeTextClassName}
            type="button"
            onClick={onClickLikeButton}
          >
            Like
          </button>
        </div>
        <button
          className="delete-button"
          type="button"
          onClick={onClickDeleteButton}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
      <hr className="line" />
    </li>
  )
}
export default CommentItem
