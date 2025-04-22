import App from './components/App/App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Posts from './components/Posts/Posts'
import PostItem from './components/PostItem/PostItem'

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Posts />,
            },
            {
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '/register',
                element: <RegisterForm />,
            },
        ],
    },
    {
        path: '/:itemId',
        element: <PostItem />,
        errorElement: <ErrorPage />,
    },
]

export default routes
