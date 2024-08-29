// import React from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useTheme } from "@mui/material";

// const modules = {
//   toolbar: [
//     [{ font: [] }],
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],

//     [{ align: [] }],
//     //[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

//     ["bold", "italic", "underline", "strike"], // toggled buttons
//     [/*'blockquote', */ "code-block"],

//     //[{ 'header': 1 }, { 'header': 2 }],               // custom button values
//     [{ list: "ordered" }, { list: "bullet" }],
//     //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//     [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//     //[{ 'direction': 'rtl' }],                         // text direction

//     //[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

//     ["clean"],
//   ],
// };

// const RichTextEditor = ({ value, onChange, placeholder, readonly = false }) => {
//   const theme = useTheme();

//   return (
//     <ReactQuill
//       theme="snow"
//       defaultValue={value}
//       modules={!readonly ? modules : { toolbar: false }}
//       onChange={onChange}
//       placeholder={placeholder}
//       readOnly={readonly}
//       style={{
//         color:
//           theme.palette.mode === "dark" ? "#fff !important" : "#000 !important",
//       }}
//     />
//   );
// };

// export default RichTextEditor;
// RichTextEditor.jsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Paper, Typography, Grid } from "@mui/material";
import "./editor.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["table"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ script: "sub" }, { script: "super" }],
    ["clean"],
  ],
};

const RichTextEditor = ({ value, onChange, placeholder, readonly = false }) => {
  return (
    <Paper elevation={3} className="rich-text-editor-container">
      <Typography variant="h6" className="editor-title">
        Text Editor
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <ReactQuill
            theme="snow"
            value={value}
            modules={!readonly ? modules : { toolbar: false }}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readonly}
            className="editor"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RichTextEditor;
