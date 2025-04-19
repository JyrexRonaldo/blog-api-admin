import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleUsernameInput = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginButton = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/log-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()
            console.log(data)
            localStorage.setItem('userToken', `${data.token}`)
            localStorage.setItem('userId', `${data.userId}`)
            // console.log(data.userId, "userId line 30" )
            // console.log(
            //     `Local storage variable : ${localStorage.getItem('userToken')}`
            // )
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="mt-30 flex w-80 flex-col items-center self-center rounded-2xl bg-neutral-700 p-8">
            <h1 className="text-2xl font-extrabold">Login</h1>
            <form className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-light">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleUsernameInput}
                        className="w-full bg-neutral-800"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordInput}
                        className="w-full bg-neutral-800"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleLoginButton}
                    className="w-full cursor-pointer bg-blue-800 p-1.5"
                >
                    Login
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500">
                    Register
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
