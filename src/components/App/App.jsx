import { useState, useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import PostDataContext from '../PostDataContext/PostDataContext'
import NavBar from '../NavBar/NavBar'

const usePostsData = (newComment, deletedCommentId) => {
    const [postsData, setPostsData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${import.meta.env.VITE_HOME_DOMAIN}/`)
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

function App() {
    const [newComment, setNewComment] = useState(null)

    const [deletedCommentId, setDeletedCommentId] = useState(null)

    const outletData = {
        ...usePostsData(newComment, deletedCommentId),
        setNewComment,
        setDeletedCommentId,
        deletedCommentId,
        newComment,
    }

    return (
        <>
            <NavBar>
                <PostDataContext.Provider value={outletData}>
                    <Outlet />
                </PostDataContext.Provider>
            </NavBar>
        </>
    )
}

export default App
