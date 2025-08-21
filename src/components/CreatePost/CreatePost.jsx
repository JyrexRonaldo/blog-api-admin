import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import NavBar from '../NavBar/NavBar'

function CreatePost() {
    const [postTitle, setPostTitle] = useState('')
    const [publishStatus, setPublishStatus] = useState(false)
    const navigate = useNavigate()
    const editorRef = useRef(null)
    const [defaultBody, setDefaultBody] = useState('Write something...')
    const [edit, setEdit] = useState(false)
    const[editPostId,setEditPostId] = useState('null')

    const handleCancel = () => {
        navigate('/')
    }

    const handleTitleInput = (e) => {
        setPostTitle(e.target.value)
    }

    const handlePublishStatusSelect = (e) => {
        console.log(e.target.value)
        setPublishStatus(e.target.value)
    }

    const handlePostSubmission = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: postTitle,
                        body: editorRef.current.getContent(),
                        authorId: localStorage.getItem('userId'),
                        status: publishStatus,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditSubmission = async () => {
        console.log(publishStatus)
        try {
            const response = await fetch(
                `${import.meta.env.VITE_HOME_DOMAIN}/${editPostId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: postTitle,
                        body: editorRef.current.getContent(),
                        authorId: localStorage.getItem('userId'),
                        status: publishStatus,
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleGoBack = () => {
        navigate('/')
    }

    console.log(JSON.parse(localStorage.getItem('postData')))

    let editData = JSON.parse(localStorage.getItem('postData'))

    if (editData !== null) {
        setPostTitle(editData.title)
        setPublishStatus(editData.publishStatus)
        setDefaultBody(editData.body)
        setEdit(true)
        setEditPostId(editData.postId)
        console.log(editData.id)
        localStorage.removeItem('postData')
    }

    return (
        <>
            <NavBar>
                <div className="mx-6 mt-4 flex max-w-180 flex-col gap-5 self-center">
                    <div className="flex justify-between">
                        <p className="text-3xl">Create a Post</p>
                        <button
                            className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                            onClick={handleGoBack}
                        >
                            Go Back!
                        </button>
                    </div>
                    <input
                        className="bg-neutral-700 px-2 py-1 text-2xl"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                        value={postTitle}
                        onChange={handleTitleInput}
                    />
                    <Editor
                        tinymceScriptSrc="/tinymce/tinymce.min.js"
                        licenseKey="ly4nwxdyn8wjevdo4ms58u5e0tm3bngx3nxsvbed2lk0uz60"
                        onInit={(_evt, editor) => (editorRef.current = editor)}
                        initialValue={`<p>${defaultBody}</p>`}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist',
                                'autolink',
                                'lists',
                                'link',
                                'image',
                                'charmap',
                                'anchor',
                                'searchreplace',
                                'visualblocks',
                                'code',
                                'fullscreen',
                                'insertdatetime',
                                'media',
                                'table',
                                'preview',
                                'help',
                                'wordcount',
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style:
                                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                    />
                    <div className="flex flex-col gap-5">
                        <label htmlFor="publish">Publish Post?</label>
                        <select
                            className="bg-neutral-700 px-2 py-1"
                            name="publish"
                            id="publish"
                            value={publishStatus}
                            onChange={handlePublishStatusSelect}
                        >
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div>

                    <div className="flex gap-3">
                        <button
                            className="rounded-[8px] bg-red-700 px-3.5 py-1"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>

                        { edit ? <button
                            onClick={handleEditSubmission}
                            className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                        >
                            Edit
                        </button> :  <button
                            onClick={handlePostSubmission}
                            className="rounded-[8px] bg-blue-600 px-3.5 py-1"
                        >
                            Create
                        </button>}
                    </div>
                </div>
            </NavBar>
        </>
    )
}

export default CreatePost
