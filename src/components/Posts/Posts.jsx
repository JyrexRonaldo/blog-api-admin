import PostCard from '../PostCard/PostCard'
import PostItem from '../PostItem/PostItem'
import PostDataContext from '../PostDataContext/PostDataContext'
import { useContext } from 'react'
import CommentList from '../CommentList/CommentList'

function Posts() {
    const { postsData, error, loading } = useContext(PostDataContext)
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

    console.log(postsData)

    const postCards = postsData.map((post) => {
        return (
            <PostCard
                key={post.id}
                authorName={post.author.username}
                dateCreated={post.createdAt}
                postTitle={post.title}
                commentsNumber={post._count.comments}
                postId={post.id}
            />
        )
    })

    return (
        <div className="mt-2 flex w-180 flex-col gap-5 self-center">
            <h1 className="text-4xl font-extrabold">Posts</h1>

            {postCards}

            {/* <CommentList postId={2} /> */}


            {/* <PostItem
                authorName={'admin'}
                dateCreated="March 22, 2025"
                postTitle="Test post"
                commentsNumber={7}
                postBody="Lorem Ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            /> */}
        </div>
    )
}

export default Posts
