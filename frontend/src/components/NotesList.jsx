import { useState, useEffect } from "react";
import { Note } from "./Note";

export const NotesList = () => {
    const [notesList, setNotesList] = useState([]);

    const loadData = () => {
        fetch("http://localhost:7070/notes")
        .then(response => response.json())
        .then(response => setNotesList(response))
    };

    const addBtn = e => {
        e.preventDefault();
        const newNote = {
            content: e.currentTarget.note.value
        };

        if ( e.currentTarget.note.value ) {
            fetch("http://localhost:7070/notes",{
                method: "POST",
                body: JSON.stringify(newNote)
            })
            e.target.reset();
        }
        loadData();
    };

    const deleteBtn = (id) => {
        fetch(`http://localhost:7070/notes/${id}`, {
            method: "DELETE"
        });
        
        loadData();
    };

    useEffect( () => {
        loadData();
        return () => setNotesList([]);
    }, [] );

    return (
        <>
            <div className="header-block">
                <h1 className="header">notes</h1>
                <button className="renew-btn btn"
                     onClick={loadData}>
                        &#128472;
                </button>
            </div>
            <div className="notes-list-block">
                {notesList.map( note => 
                <Note key={note.id} {...note} deleteBtn={deleteBtn} /> )}
            </div>
            <form className="new-note-block"
                  onSubmit={addBtn}>
                <h5 className="new-note-header">new note</h5>
                <div className="input-block">
                    <textarea className="new-note-body"
                            name="note"></textarea>
                    <button className="add-btn btn">
                            &#10148;
                    </button>
                </div>
            </form>
        </>
    )
}