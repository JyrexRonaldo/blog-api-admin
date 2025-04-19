import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import PostDataContext from '../PostDataContext/PostDataContext'
import logOutIcon from '/log-out.svg'

const usePostsData = () => {
    const [postsData, setPostsData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error('server error')
                }
                return response.json()
            })
            .then((response) => setPostsData(response))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [])

    return { postsData, error, loading }
}

function App() {
    const [loginStatus, setLoginStatus] = useState(true)

    let logOutButton = null

    const navigate = useNavigate()
    const handleLogOutButton = () => {
        localStorage.clear()
        navigate('/login')
        setLoginStatus(false)
    }

    if (loginStatus) {
        logOutButton = (
            <button onClick={handleLogOutButton}>
                <img
                    className="h-auto w-5.5 cursor-pointer"
                    src={logOutIcon}
                    alt="edit-icon"
                />
            </button>
        )
    } else {
        logOutButton = (
            <button disabled onClick={handleLogOutButton}>
                <img
                    className="h-auto w-5.5 cursor-pointer"
                    src={logOutIcon}
                    alt="edit-icon"
                />
            </button>
        )
    }

    const outletData = { ...usePostsData() }

    return (
        <div className="flex h-full flex-col bg-neutral-900 pb-20 text-white">
            <nav className="flex h-20 items-center justify-around">
                <Link to="/">
                    <p className="text-3xl font-extrabold text-blue-500">
                        OdinBlog
                    </p>
                </Link>
                {logOutButton}
            </nav>
            <PostDataContext.Provider value={outletData}>
                <Outlet />
            </PostDataContext.Provider>
        </div>
    )
}

export default App
