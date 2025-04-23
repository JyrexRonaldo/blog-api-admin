import App from './components/App/App'
import ErrorPage from './components/ErrorPage/ErrorPage'
import LoginForm from './components/LogInForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import Posts from './components/Posts/Posts'
import PostItem from './components/PostItem/PostItem'
import CreatePost from './components/CreatePost/CreatePost'
import AllPosts from './components/AllPosts/AllPosts'

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
    {
        path: '/new',
        element: <CreatePost />,
    },
    {
        path: '/allposts',
        element: <AllPosts />,
        errorElement: <ErrorPage />,
    },
]

export default routes
