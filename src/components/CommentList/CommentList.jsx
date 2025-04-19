import { useState, useEffect } from 'react'
import Comment from '../Comment/Comment'

const useCommentsData = (postId) => {
    const [commentsData, setCommenttsData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3000/${postId}/comments`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error')
                }
                return response.json()
            })
            .then((response) => setCommenttsData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [postId])

    return { commentsData, error, loading }
}

function CommentList({ postId }) {
    const { commentsData, error, loading } = useCommentsData(postId)

    if (loading)
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    if (error)
        return (
            <div>
                <p>A network error was encountered</p>
            </div>
        )


    const commentCards = commentsData.map((comment) => {
        return (
            <Comment
                key={comment.id}
                author={comment.author.username}
                createdAt={comment.createdAt}
                comment={comment.comment}
                commentId={comment.id}
                postId={comment.postId}
            />
        )
    })

    return <div>
        {commentCards}
    </div>
}

export default CommentList
