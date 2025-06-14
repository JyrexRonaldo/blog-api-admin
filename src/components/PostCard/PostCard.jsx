import { Link } from 'react-router-dom'
import { useState } from 'react'
import Comment from '../Comment/Comment'
import commentIcon from '/commentIcon.svg'
import readIcon from '/read.svg'
import CommentList from '../CommentList/CommentList'
import { useNavigate } from 'react-router-dom'
import Textarea from '../Textarea/Textarea'
import { format } from 'date-fns'

function PostCard({
    authorName,
    dateCreated,
    postTitle,
    commentsNumber,
    postId,
    setNewComment,
    setDeletedCommentId,
    deletedCommentId,
    newComment,
}) {
    const [comment, setComment] = useState('')

    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const handleCommentDisplay = () => {
        setShow(!show)
    }

    const handlePostItemDisplay = () => {
        navigate(`/${postId}`)
    }

    const handleCommentTextarea = (e) => {
        setComment(e.target.value)
    }

    const handleCommentPost = async (e) => {
        console.log(e.target.dataset.userId)
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/:${postId}/comments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comment,
                        authorId: localStorage.getItem('userId'),
                        postId,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            setComment('')
            setNewComment({ ...data })
        } catch (error) {
            console.log(error)
        }
    }

    dateCreated = format(new Date(dateCreated), 'MMMM dd, yyyy')

    return (
        <div className="flex flex-col gap-3 rounded-[12px] bg-neutral-800 p-5.5 transition duration-300 hover:-translate-y-1 hover:bg-neutral-700">
            <div className="flex gap-3.5">
                <p className="text-[0.8rem] font-extrabold">{authorName}</p>
                <p className="text-[0.8rem] font-extralight">{dateCreated}</p>
            </div>
            <Link to={`/${postId}`}>
                <p className="text-4xl font-bold">{postTitle}</p>
            </Link>

            <div className="flex gap-3.5 font-extralight">
                <button
                    onClick={handleCommentDisplay}
                    className="flex cursor-pointer items-center gap-1.5"
                >
                    <img
                        className="h-auto w-3.5"
                        src={commentIcon}
                        alt="comment icon"
                    />
                    <p>
                        {commentsNumber}{' '}
                        {commentsNumber > 1 ? 'Comments' : 'Comment'}
                    </p>
                </button>
                <button
                    className="flex cursor-pointer gap-1.5"
                    onClick={handlePostItemDisplay}
                >
                    <img
                        className="h-auto w-3.5"
                        src={readIcon}
                        alt="comment-icon"
                    />
                    <p>Read</p>
                </button>
            </div>

            {show && (
                <div className="flex flex-col gap-3">
                    <p>Comments ({commentsNumber})</p>
                    <Textarea
                        textBoxValue={comment}
                        textFieldHandler={handleCommentTextarea}
                        sendButtonHandler={handleCommentPost}
                        placeholderText={'Leave a comment...'}
                    ></Textarea>
                    <CommentList
                        postId={postId}
                        newComment={newComment}
                        deletedCommentId={deletedCommentId}
                        setDeletedCommentId={setDeletedCommentId}
                    />
                </div>
            )}
        </div>
    )
}

export default PostCard
