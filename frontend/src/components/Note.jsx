// eslint-disable-next-line react/prop-types
export const Note = ({id, content, deleteBtn}) => {
    return (
        <div className="note-block">
            <div className="note-body">{content}</div>
            <button className="delete-btn btn"
                 onClick={() => deleteBtn(id)}>
                    &#10005;
            </button>
        </div>
    )
}