import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import logOutIcon from '/log-out.svg'

function NavBar({ children }) {
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
            {children}
        </div>
    )
}

export default NavBar
