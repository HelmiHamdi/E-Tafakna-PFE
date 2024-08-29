import SideBar from "../../components/contentNotes/SideBar";
import Main from "../../components/contentNotes/Main";
import { useEffect, useState } from "react";

import axios from "axios";
import "./Notes.css";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState(JSON.parse(localStorage.notes || []));
  const [activeNote, setActiveNote] = useState(false);

  const test = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8800/api/notes/getNoteByLoyer",
        {
          idLoyer: currentUser.id,
        }
      );
     
      setNotes(result.data);

      // Mise à jour du localStorage avec les nouvelles notes
      localStorage.setItem("notes", JSON.stringify(result.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
useEffect(() => {
  

  test();
}, [currentUser]);



const onAddNote = async () => {
  
  try {
    // Définir la nouvelle note
    const newNote = {
      title: "Untitled Note",
      body: "",
      idLoyer:currentUser.id,
      lastModified: Date.now(),
    };
    
    const response = await axios.post("http://localhost:8800/api/notes/addNotes", newNote);
   test();
    setNotes([...notes, response.data]);
   
   
  } catch (error) {
    console.error("Error adding note:", error);
  }
};



const onDeleteNote = async (idToDelete) => {
  try {
    await axios.delete(`http://localhost:8800/api/notes/deleteNotes`, {
      data: { id: idToDelete }
      
    })
   test();
   
      setNotes(notes.filter(note => note.id !== idToDelete));
  
    
  } catch (error) {
    toast.error("Error deleting note:", error);
  }
};

const onUpdateNote = async (updatedNote) => {
  try {
    await axios.put(`http://localhost:8800/api/notes/updateNotes`, updatedNote);
    test();
    setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
  } catch (error) {
   toast.error("Error updating note:", error);
    toast.log("Error response:", error.response); // Afficher la réponse d'erreur
  }
};


  return (
    <div className="Notes">
      <SideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={notes.find(note => note.id === activeNote)} onUpdateNote={onUpdateNote} />
    </div>
  );
};
export default Notes;





