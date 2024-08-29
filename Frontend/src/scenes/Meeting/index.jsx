import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Header from "../../components/Header/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState , useEffect } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Popconfirm, Button } from 'antd';
import "../Files/index.css"
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: 'image', 
      headerName: 'Avatar',
      width: 100,
      renderCell:(params)=>{
        return <img style={{
                       width: "40px",
                       height: "40px",
                       borderRadius: "50%",
                       objectFit: "cover",
                     }} src={params.row.image || require("../../assets/noavatar.png")} alt="" /> 
      }
      },
    {
      field: "first_name",
      headerName: "First Name",
      width: 120,
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 100,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      type: "Date",
      width: 120,
      editable: true,
      renderCell: (params) => {
        const date = new Date(params.row.date);
        const formattedDate = date.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
        return <div>{formattedDate}</div>;
      },
    },
    {
      field: "created_at",
      headerName: "Created At",
      type: "text",
      width: 100,
      editable: true,
    },
    {
      field: "end_time",
      headerName: "End At",
      type: "text",
      width: 100,
      editable: true,
    },
    {
      field: "joinMeeting",
      headerName: "Join Meeting",
      width: 150,
      editable: true,
      renderCell: (params) => {
        const joinMetting = (meetingUrl) => {
          console.log("test",meetingUrl);
          window.open("https://meet.google.com/ery-fqkf-ymt", "_blank");
        };
  
        return (
          
          <VideocamOutlinedIcon onClick={() => joinMetting(params.row.meetingUrl)}/>
        
        );
      },
    }
    ,];
  
  
  
         const handleDelete = async (id) => {

          await axios.delete("http://localhost:8800/api/link/deleteLink", {
                data: { id: id },
              })
              .then((res) => {
                if(res.data === "Link can only be deleted after the meeting or date has passed"){
                  toast.error("Link can only be deleted after the meeting or date has passed");
                } else {
                  toast.success("Link deleted successfully");
                }
                test();
              })
              .catch((err) => {
                console.error(err.message);
                toast.error("An error occurred while deleting the link");
              });

        };
         const actionColumn = {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
              
            return (
              <Popconfirm
    title="Delete the meeting?"
    description="Are you sure to delete this meeting?"
    onConfirm={()=>handleDelete(params.row.id)}
    okText="Yes"
    cancelText="No"
       okButtonProps={{ className: "popconfirm-yes-button" }}
      cancelButtonProps={{
          className: "popconfirm-no-button",
          }}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
             
            );
          },
        };

 const [user, setUser] = useState([]);
 const { currentUser } = useContext(AuthContext);
  const test = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8800/api/link/getLinksByLoyer",
        {
          loyer_id: currentUser.id,
        }
      );
      console.log(currentUser.id, "sss");
      setUser(result.data); // Définir les données de l'utilisateur dans le state
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    test();
  }, [currentUser]);
  return (
    <Box m="20px" mt="-30px">
     <Box display="flex" justifyContent="space-between" alignItems="center" >
       
       <Header title="MEETINGS" subtitle="welcome to your meeting  " />
     </Box>
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      > <ToastContainer />
         <DataGrid checkboxSelection rows={user} columns={[...columns, actionColumn]} components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default Contacts;
