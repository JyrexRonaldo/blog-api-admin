import { useState } from 'react'
import deleteIcon from '/trash.svg'
import editIcon from '/edit.svg'
import Textarea from '../Textarea/Textarea'

function Comment({ author, createdAt, comment, commentId, postId }) {
    const [show, setShow] = useState(false)

    const [updateComment, setUpdateComment] = useState(comment)

    const handleCommentTextarea = (e) => {
        setUpdateComment(e.target.value)
    }

    const handleCommentEdit = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/${postId}/comments/${commentId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comment: updateComment,
                        authorId: localStorage.getItem('userId'),
                    }),
                }
            )

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = () => {
        setShow(!show)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/${postId}/comments/${commentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        commentId,
                    }),
                }
            )
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <div className="flex gap-3 text-[11px]">
                        <p>{author}</p>
                        <p>{createdAt}</p>
                    </div>
                    <p className="text-[14px]">{comment}</p>
                </div>
                <div className="flex gap-3.5">
                    <button onClick={handleEdit}>
                        <img
                            className="h-auto w-3.5 cursor-pointer"
                            src={editIcon}
                            alt="edit-icon"
                        />
                    </button>
                    <button onClick={handleDelete}>
                        <img
                            className="h-auto w-3.5 cursor-pointer"
                            src={deleteIcon}
                            alt="comment-icon"
                        />
                    </button>
                </div>
            </div>
            {show && (
                <Textarea
                    textBoxValue={updateComment}
                    textFieldHandler={handleCommentTextarea}
                    sendButtonHandler={handleCommentEdit}
                ></Textarea>
            )}
            <hr className="mt-2 border-neutral-700" />
        </div>
    )
}

export default Comment
