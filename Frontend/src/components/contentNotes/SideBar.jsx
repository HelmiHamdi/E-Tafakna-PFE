import { Box } from "@mui/material";
import { MdOutlineNoteAlt } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import Header from "../Header/Header";
import { AuthContext } from "../../context/authContext";

import { useContext } from "react";
import { Popconfirm, Button } from 'antd';
import "../../scenes/Files/index.css"
const SideBar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote, 
}) => {
  const { currentUser } = useContext(AuthContext);
  const sortedNotes = notes.sort((a,b)=> b.lastModified - a.lastModified);
  return (
    
    <Box className="app-sidebar" m="20px" mt="-30px">
       
       <div>
      <div className="app-sidebar-header">
      <Header title="Notes" subtitle="Add your notes" />
        <button onClick={onAddNote} className="button-note"><MdOutlineNoteAlt /></button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified })  => (
          <div className={`app-sidebar-note ${id === activeNote && "active"}`} onClick={() => setActiveNote(id)}>
            <div className="sidebar-note-title">
              <strong>{title}</strong>
         
               <Popconfirm
    title="Delete this note"
    description="Are you sure to delete this note"
    onConfirm={() => onDeleteNote(id)}
    okText="Yes"
    cancelText="No"
    okButtonProps={{ className: "popconfirm-yes-button" }}
          cancelButtonProps={{
              className: "popconfirm-no-button",
           }}
  >
    <Button  className="button-note"><RiDeleteBin5Line /></Button>
  </Popconfirm> 
              
            </div>
            <p>{body && body.substr(0, 100)}</p>
            <small className="note-meta">
              Last modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second:"2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
      </div>
    </Box>
  );
};

export default SideBar;

