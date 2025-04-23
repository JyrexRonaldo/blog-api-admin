import PostDataContext from '../PostDataContext/PostDataContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../PostCard/PostCard'
import NavBar from '../NavBar/NavBar'

const usePostsData = (newComment, deletedCommentId) => {
    const [postsData, setPostsData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOME_DOMAIN}/allposts`)
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error')
                }
                return response.json()
            })
            .then((response) => setPostsData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [newComment, deletedCommentId])

    return { postsData, error, loading }
}

function AllPosts() {
    const [newComment, setNewComment] = useState(null)

    const [deletedCommentId, setDeletedCommentId] = useState(null)

    const navigate = useNavigate()
    const { postsData, error, loading } = usePostsData(
        newComment,
        deletedCommentId
    )

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

    const postCards = postsData
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        .map((post) => {
            return (
                <PostCard
                    key={post.id}
                    authorName={post.author.username}
                    dateCreated={post.createdAt}
                    postTitle={post.title}
                    commentsNumber={post._count.comments}
                    postId={post.id}
                    setNewComment={setNewComment}
                    setDeletedCommentId={setDeletedCommentId}
                    deletedCommentId={deletedCommentId}
                    newComment={newComment}
                />
            )
        })

    const handleGoBack = () => {
        navigate('/')
    }

    return (
        <>
            <NavBar>
                <div className="mt-2 flex w-180 flex-col gap-5 self-center">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-extrabold">Posts</h1>
                        <button
                            className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                            onClick={handleGoBack}
                        >
                            Go Back!
                        </button>
                    </div>
                    {postCards}
                </div>
            </NavBar>
        </>
    )
}

export default AllPosts
