import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import NavBar from '../NavBar/NavBar'

function CreatePost() {
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [publishStatus, setPublishStatus] = useState('UNPUBLISH')
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate('/')
    }

    const handleTitleInput = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePostTextarea = (e) => {
        setPostBody(e.target.value)
    }

    const handlePublishStatusSelect = (e) => {
        setPublishStatus(e.target.value)
    }

    const handlePostSubmission = async () => {
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: postTitle,
                    body: postBody,
                    authorId: localStorage.getItem('userId'),
                    status: publishStatus,
                }),
            })

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavBar>
                <div className="mt-4 flex w-180 flex-col gap-5 self-center">
                    <p className="text-3xl">Create a Post</p>
                    <input
                        className="bg-neutral-700 px-2 py-1 text-2xl"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        value={postTitle}
                        onChange={handleTitleInput}
                    />
                    <textarea
                        className="resize-none bg-neutral-700 px-2 py-1"
                        name="post"
                        id="post"
                        placeholder="Write something..."
                        rows="17"
                        value={postBody}
                        onChange={handlePostTextarea}
                    ></textarea>
                    <div className="flex flex-col gap-5">
                        <label htmlFor="publish">Publish Post?</label>
                        <select
                            className="bg-neutral-700 px-2 py-1"
                            name="publish"
                            id="publish"
                            value={publishStatus}
                            onChange={handlePublishStatusSelect}
                        >
                            <option value="UNPUBLISH">No</option>
                            <option value="PUBLISH">Yes</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="rounded-[8px] bg-red-700 px-3.5 py-1"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePostSubmission}
                            className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </NavBar>
        </>
    )
}

export default CreatePost
