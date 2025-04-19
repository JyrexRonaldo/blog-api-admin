function Textarea({ textBoxValue, textFieldHandler, sendButtonHandler, placeholderText }) {
    return (
        <div className="flex items-center gap-2">
            <textarea
                className="resize-none rounded-[7px] bg-neutral-700 px-2 py-1"
                name="comment"
                id=""
                placeholder={placeholderText}
                cols="70"
                rows="2"
                value={textBoxValue}
                onChange={textFieldHandler}
            ></textarea>
            <button
                className="rounded-[7px] bg-blue-500 p-2"
                onClick={sendButtonHandler}
            >
                Send
            </button>
        </div>
    )
}

export default Textarea
