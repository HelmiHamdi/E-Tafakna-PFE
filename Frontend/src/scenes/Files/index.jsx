import { Popconfirm } from "antd";
import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import {
  FaFolderPlus,
  FaFileAlt,
  FaFileUpload,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { TbFileText } from "react-icons/tb";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import "./index.css";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputBase,
  Paper,
  Grid,
  Breadcrumbs,
  Modal,
  Backdrop,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { FaFolder } from "react-icons/fa";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { HomeOutlined } from "@mui/icons-material";
import axios from "axios";
import RichTextEditor from "./RichTextEditor";
import { AuthContext } from "../../context/authContext";
import { styled } from "@mui/material/styles";
import { CiFileOn } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import docx from "../../assets/docx.png";
import pptx from "../../assets/pptx.png";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ":hover": {
    backgroundColor: theme.palette.mode === "dark" ? "transparent" : "#fff",
  },
}));
const inputStyle = {
  padding: "12px 16px", // Ajustement du padding pour un espace plus confortable
  borderRadius: "5px", // Coins arrondis
  border: "1px solid #ced4da", // Bordure légère
  backgroundColor: "#f5f5f5", // Couleur de fond
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out", // Transition douce pour les changements
  width: "100%", // Utilisation de toute la largeur disponible
  fontSize: "16px", // Taille de police
  color: "#333333", // Couleur du texte
  outline: "none", // Suppression de l'outline
  "&:hover": {
    borderColor: "#3f51b5", // Couleur de bordure au survol
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)", // Légère ombre au survol
  },
  "&:focus": {
    borderColor: "#3f51b5", // Couleur de bordure au focus
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)", // Ombre augmentée au focus
  },
};
const CustomModal = ({
  open,
  handleClose,
  handleSave,
  newFolderName,
  setNewFolderName,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white", // Couleur de fond
            boxShadow: 8, // Ombre légère
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            mb={2}
            sx={{ color: "#0000ff", textAlign: "center" }}
          >
            Add Folder
          </Typography>
          <input
            autoFocus
            id="folderName"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              marginTop: "10px",
              fontSize: "16px",
            }}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={() => {
                setNewFolderName("");
                handleClose();
              }}
              style={{
                marginRight: "190px",
                color: "white",
                backgroundColor: "black",
              }}
              startIcon={<FaTimes />}
            >
              Cancel
            </Button>
            <Button
              style={{ backgroundColor: "#3CB371", color: "white" }}
              onClick={handleSave}
              startIcon={<FaCheck />}
              disabled={!newFolderName.trim()}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

const Files = () => {
  const { currentUser } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState({ path: "" });
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const getFileUrl = (filePath) => {
    return `http://localhost:8800${filePath}`;
  };

  const getFileExtension = (filename) => {
    const lastDotIndex = filename.lastIndexOf(".");
    if (
      lastDotIndex === -1 ||
      lastDotIndex === 0 ||
      lastDotIndex === filename.length - 1
    ) {
      return "";
    }
    return filename.substring(lastDotIndex + 1).toLowerCase();
  };

  const fetchData = () =>
    axios
      .get("http://localhost:8800/api/files/getFilesByLoyer/" + currentUser.id)
      .then((res) => res.data)
      .then((data) => setData(data));

  const handleAddFolder = async () => {
    await axios.post("http://localhost:8800/api/files", {
      fileName: newFolderName,
      folderPath: selectedFolder?.path || "",
      fileType: "folder",
      fileContent: "",
      idLoyer: currentUser.id,
    });
    await fetchData();

    setNewFolderName("");
    setOpenFolderDialog(false);
  };

  const handleAddFile = async () => {
    if (selectedFile?.id)
      await axios.put("http://localhost:8800/api/files/updateFiles", {
        id: selectedFile?.id,
        fileName: fileName,
        folderPath: selectedFolder?.path || "",
        fileType: "file",
        fileContent: fileContent,
        idLoyer: currentUser.id,
      });
    else
      await axios.post("http://localhost:8800/api/files", {
        fileName: fileName,
        folderPath: selectedFolder?.path || "",
        fileType: "file",
        fileContent: fileContent,
        idLoyer: currentUser.id,
      });
    await fetchData();

    setFileName("");
    setFileContent("");
    setOpenFileDialog(false);
  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost:8800/api/files/deleteFiles", {
      data: { id: id },
    });
    await fetchData();
  };

  const handleUploadFile = async () => {
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("idLoyer", currentUser.id);
    formData.append("folderPath", selectedFolder?.path || "");

    await axios.post("http://localhost:8800/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await fetchData();
    setFileToUpload();
    setOpenUploadDialog(false);
  };

  return (
    <Box m="20px" mt="-30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FILES" subtitle="Welcome to your files" />
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<FaFolderPlus />}
        onClick={() => setOpenFolderDialog(true)}
      >
        Add Folder
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaFileAlt />}
        onClick={() => setOpenFileDialog(true)}
        style={{ marginLeft: "10px" }}
      >
        Add File
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FaFileUpload />}
        style={{ marginLeft: "10px" }}
        onClick={() => setOpenUploadDialog(true)}
      >
        Upload File
      </Button>

      {/* Add Folder Modal */}
      <CustomModal
        open={openFolderDialog}
        handleClose={() => setOpenFolderDialog(false)}
        handleSave={handleAddFolder}
        newFolderName={newFolderName}
        setNewFolderName={setNewFolderName}
      />

      <Dialog
        open={openFileDialog}
        onClose={() => setOpenFileDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle style={{ fontSize: "40px", color: "blue" }}>
          {selectedFile?.id ? "Edit File" : "Add File"}
        </DialogTitle>
        <DialogContent>
          <Paper
            component="form"
            sx={{
              padding: "10px",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "1px solid #ced4da",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              autoFocus
              placeholder="File Name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              style={inputStyle}
            />
          </Paper>
          <RichTextEditor
            value={fileContent}
            onChange={(value) => setFileContent(value)}
            placeholder="File Content"
            editorClassName="rich-text-editor"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFileName("");
              setOpenFileDialog(false);
            }}
            style={{
              borderRadius: "20px",
              marginRight: "100px",
              color: "white",
              background: "red",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddFile}
            style={{
              borderRadius: "20px",
              marginRight: "320px",
              color: "white",
              background: "#4CAF50",
            }}
          >
            {selectedFile?.id ? "Edit" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Upload File Dialog */}
      <Dialog
        open={openUploadDialog}
        onClose={() => setOpenUploadDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ backgroundColor: "black", color: "white" }}>
          Upload File
        </DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <input
              type="file"
              onChange={(e) => setFileToUpload(e.target.files[0])}
              style={{
                display: "none",
              }}
              id="upload-file-input"
            />
            <label htmlFor="upload-file-input">
              <Button
                variant="contained"
                component="span"
                sx={{ marginBottom: "20px", backgroundColor: "#3f51b5" }}
              >
                Choose File
              </Button>
            </label>
            {fileToUpload && (
              <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                {fileToUpload.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#f5f5f5" }}>
          <Button
            onClick={() => {
              setFileToUpload(null);
              setOpenUploadDialog(false);
            }}
            style={{
              marginRight: "430px",
              color: "white",
              backgroundColor: "#f44336",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadFile}
            variant="contained"
            sx={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Breadcrumbs style={{ marginTop: "8px" }}>
        <Typography
          color="text.primary"
          onClick={() => setSelectedFolder({ path: "" })}
        >
          <HomeOutlined />
        </Typography>
        {selectedFolder?.path.split("/").map((folder, index) =>
          index === 0 ? null : index ===
            selectedFolder?.path.split("/").length - 1 ? (
            <Typography color="text.primary">{folder}</Typography>
          ) : (
            <Typography
              color="text.primary"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setSelectedFolder({
                  path: selectedFolder?.path
                    .split("/")
                    .slice(0, index + 1)
                    .join("/"),
                })
              }
            >
              {folder}
            </Typography>
          )
        )}
      </Breadcrumbs>

      {/* Folders */}

      <Box style={{ flexGrow: 1, height: "440px", overflow: "auto" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {data
              .filter(
                (e) =>
                  (e.folderPath === selectedFolder?.path || "") &&
                  e.fileType === "folder"
              )
              .map((folder, index) => (
                <Grid item xs={2} key={index}>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "end",
                      width: "20%",
                    }}
                  >
                    <Popconfirm
                      title="Delete this folder"
                      description="Are you sure to delete this folder"
                      onConfirm={() => handleDelete(folder.id)}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ className: "popconfirm-yes-button" }}
                      cancelButtonProps={{ className: "popconfirm-no-button" }}
                    >
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Popconfirm>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() =>
                      setSelectedFolder({
                        ...folder,
                        path: folder.folderPath + "/" + folder.fileName,
                      })
                    }
                  >
                    <FaFolder size={80} style={{ color: "#FFD700" }} />
                    {folder.fileName}
                  </div>
                </Grid>
              ))}
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {data
              .filter(
                (e) =>
                  (e.folderPath === selectedFolder?.path || "") &&
                  e.fileType === "file"
              )
              .map((file, index) => (
                <Grid item xs={2} key={index}>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "end",
                      width: "70%",
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      // Ajoutez un marginRight ici pour l'espacement
                      style={{ marginRight: "20px" }}
                    >
                      {/* <Popconfirm
                        title="Delete this file"
                        description="Are you sure to delete this file"
                        onConfirm={() => handleDelete(file.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteIcon />
                      </Popconfirm> */}
                      <Popconfirm
                        title="Delete this file"
                        description="Are you sure to delete this file"
                        onConfirm={() => handleDelete(file.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "popconfirm-yes-button" }}
                        cancelButtonProps={{
                          className: "popconfirm-no-button",
                        }}
                      >
                        <DeleteIcon />
                      </Popconfirm>
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        setFileName(file.fileName);
                        setFileContent(file.fileContent);
                        setSelectedFile(file);
                        setOpenFileDialog(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setFileName(file.fileName);
                      setFileContent(file.fileContent);
                      setSelectedFile(file);
                      setOpenFileDialog(true);
                    }}
                  >
                    <TbFileText size={80} style={{ color: "#2C5898" }} />
                    {file.fileName}
                  </div>
                </Grid>
              ))}
          </Grid>
        </Box>
        
        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
          <Grid container spacing={2}>
            {data
              .filter(
                (e) =>
                  (e.folderPath === selectedFolder?.path || "") &&
                  e.fileType === "upload"
              )
              .map((file, index) => (
                <Grid item xs={12} sm={9} md={5} lg={3} key={index}>
                  
                  <div
                    style={{
                      backgroundColor: "transparent",
                      cursor: "pointer",
                      flexDirection: "row",
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "end",
                      width: "20%",
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      style={{ marginRight: "-30px" }}
                    >
                       <Popconfirm
                        title="Delete this file"
                        description="Are you sure to delete this file"
                        onConfirm={() => handleDelete(file.id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ className: "popconfirm-yes-button" }}
                        cancelButtonProps={{
                          className: "popconfirm-no-button",
                        }}
                      >
                        <DeleteIcon />
                      </Popconfirm>
                    </IconButton>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      flexDirection: "column",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "10px",
                      marginLeft: "50px",
                    }}
                  >
                    {getFileExtension(file.upload) === "pdf" ? (
                      <div>
                        <embed
                          src={getFileUrl(file.upload)}
                          type="application/pdf"
                          width="180"
                          height="180"
                          style={{ cursor: "pointer", borderRadius: "5px" }}
                        />
                        <button
                          onClick={() =>
                            window.open(getFileUrl(file.upload), "_blank")
                          }
                          style={{
                            backgroundColor: "#4CAF50",
                            border: "none",
                            color: "white",
                            padding: "10px 20px",
                            textAlign: "center",
                            fontSize: "14px",
                            margin: "10px 0",
                            cursor: "pointer",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            marginLeft: "50px",
                          }}
                        >
                          Open
                        </button>
                      </div>
                    ) : getFileExtension(file.upload) === "docx" ? (
                      <div
                        onClick={() =>
                          window.open(getFileUrl(file.upload), "_blank")
                        }
                        style={{ cursor: "pointer", width: 100, height: 100 }}
                      >
                        <img
                          src={docx}
                          alt={file.fileName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "12px",
                            marginTop: "-40px",
                          }}
                        />
                        <button
                          onClick={() =>
                            window.open(getFileUrl(file.upload), "_blank")
                          }
                          style={{
                            backgroundColor: "#4CAF50",
                            border: "none",
                            color: "white",
                            padding: "10px 20px",
                            textAlign: "center",
                            fontSize: "14px",
                            margin: "10px 0",
                            marginLeft: "10px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            marginTop: "10px",
                          }}
                        >
                          Download
                        </button>
                      </div>
                    ) : getFileExtension(file.upload) === "pptx" ? (
                      <div
                        onClick={() =>
                          window.open(getFileUrl(file.upload), "_blank")
                        }
                        style={{ cursor: "pointer", width: 100, height: 100 }}
                      >
                        <img
                          src={pptx}
                          alt={file.fileName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "12px",
                            marginTop: "-40px",
                          }}
                        />
                        <button
                          onClick={() =>
                            window.open(getFileUrl(file.upload), "_blank")
                          }
                          style={{
                            backgroundColor: "#4CAF50",
                            border: "none",
                            color: "white",
                            padding: "10px 20px",
                            textAlign: "center",
                            fontSize: "14px",
                            marginLeft: "5px",
                            cursor: "pointer",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            marginTop: "10px",
                          }}
                        >
                          Download
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          window.open(getFileUrl(file.upload), "_blank")
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={getFileUrl(file.upload)}
                          alt={file.fileName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "12px",
                            marginTop: "0px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {/* </Item> */}
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Files;
