import React, { useEffect, useState } from 'react'
import { addNotes, deleteNote, editNote, getNotes } from '../utils/api';
import { MdAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FiSave } from "react-icons/fi";

const Notes = () => {

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedNote, setSelectedNote] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response || [])
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    }
    fetchNotes();
  }, []);

  const openPopup = (note = "", editMode = false) => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedNote(note);
    } else {
      setTitle("");
      setContent("");
      setSelectedNote(null);
    }
    setIsEditing(editMode);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedNote(null);
    setIsEditing(false);
  };

  // Add or Edit 
  const handleSaveNote = async () => {
    if(!title.trim() || !content.trim()){
      alert("Title and content cannot be empty")
      return;
    }
    try {
      if(selectedNote) {
        await editNote(selectedNote._id, { title, content });
      } else {
        const newNote = { title, content }
        await addNotes(newNote);
      }

      const response = await getNotes();
      setNotes(response || []);
      closePopup();
    } catch (error) {
      console.error("error saving note: ", error);
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote (noteId);
      setNotes(notes.filter(note => note._id !== noteId))
      closePopup();
    } catch (error) {
      console.error("Err deleting note: ", error);
    }
  }
  return (
    <div className='Notes'>

      <div className="section1">
        <h2>My Notes</h2>
        <button onClick={() => openPopup()}>Add Note <MdAdd /></button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div className="note-item" key={note._id} onClick={() => openPopup(note, false)}>
            <h3>{note.title}</h3>
            <p>{note.content.substring(0, 20)}...</p>
          </div>
          ))}
      </div>
      
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}><IoClose /></button>

            {isEditing ? (
              <div className='editor'>
                <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={content} placeholder='Note here...' onChange={(e) => setContent(e.target.value)} />
                  <div className="editor-btns">
                  <button onClick={handleSaveNote} className='save-btn'><FiSave /> Save</button>
                  </div>
              </div>
            ) : (
              <>
                <h2>{title}</h2>
                <p>{content}</p>
                <button onClick={() => openPopup(selectedNote, true)} className='edit-btn'>Edit <FaRegEdit /></button>
                <button onClick={() => handleDeleteNote(selectedNote._id)} className='delete-btn'><MdDelete /></button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default Notes