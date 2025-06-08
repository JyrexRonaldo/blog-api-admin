import PostCard from '../PostCard/PostCard'
import PostItem from '../PostItem/PostItem'
import PostDataContext from '../PostDataContext/PostDataContext'
import { useContext } from 'react'
import CommentList from '../CommentList/CommentList'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Posts() {
    const navigate = useNavigate()
    const {
        postsData,
        error,
        loading,
        setNewComment,
        setDeletedCommentId,
        deletedCommentId,
        newComment,
    } = useContext(PostDataContext)
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

    const handleCreatePost = () => {
        navigate('/new')
    }

    const handleViewAllPosts = () => {
        navigate('/allposts')
    }

    return (
        <div className="mx-5 mt-2 flex max-w-180 flex-col gap-5 self-center">
            <div className="flex justify-between max-sm:grid grid-cols-2 max-sm:grid-rows-2 max-sm:gap-y-3.5 max-sm:justify-items-start">
                <h1 className="text-4xl font-extrabold max-sm:col-span-2">Posts</h1>
                <button
                    className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                    onClick={handleCreatePost}
                >
                    Create a Post
                </button>
                <button
                    className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                    onClick={handleViewAllPosts}
                >
                    View all Posts
                </button>
            </div>
            {postCards}
        </div>
    )
}

export default Posts
