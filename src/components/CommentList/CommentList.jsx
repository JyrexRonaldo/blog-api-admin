import { useState, useEffect } from 'react'
import Comment from '../Comment/Comment'

const useCommentsData = (postId, newComment, deletedCommentId) => {
    const [commentsData, setCommenttsData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOME_DOMAIN}/${postId}/comments`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error')
                }
                return response.json()
            })
            .then((response) => setCommenttsData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [postId, newComment, deletedCommentId])

    return { commentsData, error, loading }
}

function CommentList({
    postId,
    newComment = null,
    deletedCommentId = null,
    setDeletedCommentId,
}) {
    const { commentsData, error, loading } = useCommentsData(
        postId,
        newComment,
        deletedCommentId
    )

    const [show, setShow] = useState(false)

    if (loading)
        return (
            <div className="mt-52 flex items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    if (error)
        return (
            <div className="mt-52 flex items-center justify-center">
                <p>A network error was encountered</p>
            </div>
        )

    const commentCards = commentsData
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        .map((comment) => {
            return (
                <Comment
                    key={comment.id}
                    author={comment.author.username}
                    authorId={comment.authorId}
                    createdAt={comment.createdAt}
                    comment={comment.comment}
                    commentId={comment.id}
                    postId={comment.postId}
                    setDeletedCommentId={setDeletedCommentId}
                    showId={comment.id}
                    show={show}
                    setShow={setShow}
                />
            )
        })

    return <div>{commentCards}</div>
}

export default CommentList
