import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid ,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header/Header";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState , useEffect } from "react";
import { useContext } from "react";
import "../Files/index.css"
import { Popconfirm, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Client = () => {
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
     field: 'first_name',
     headerName: 'First name',
     width: 110,
     editable: true,
   },
   {
     field: 'last_name',
     headerName: 'Last name',
     width: 90,
     editable: true,
   },
   {
     field: 'email',
     headerName: 'Email',
     type: 'text',
     width: 220,
     editable: true,
   },
   {
       field: 'phone',
       headerName: 'Phone',
       type: 'number',
       width: 150,
       editable: true,
     }, {
      field: 'address',
      headerName: 'Address',
      width: 100,
      editable: true,
    }
     
]
  
       
 const { currentUser } = useContext(AuthContext);
 const [client, setClient] = useState([]);
 useEffect(() => {
   const test = async () => {
     try {
     
 const result = await axios.post(
         "http://localhost:8800/api/link/getUsersByLoyer",
         {
          loyer_id: currentUser.id,
         }
        );
console.log(result.data)
       setClient(result.data); // Définir les données de l'utilisateur dans le state
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
   test();
 
 }, [currentUser]);
 
    const handleDelete = (id) => {
    
    
        axios
          .delete("http://localhost:8800/api/link/deleteUser", {
            data: { id: id },
           
          })
          .then((res) => {
            test();
          })
          .catch((err) => {
            console.error(err.message);
            toast.error("An error occurred while deleting the Client");
          });
    
    };
  const test = async () => {
     try {
      const result = await axios.post(
        "http://localhost:8800/api/link/getUsersByLoyer",
        {
          loyer_id: currentUser.id,
        }
      );
      console.log(currentUser.id, "sss");
      setClient(result.data);
   
     } catch (error) {
       console.error("Error fetching data:", error);
     }
  };
  
         const actionColumn = {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
      
            return (
              <Popconfirm
    title="Delete this client?"
    description="Are you sure to delete this client?"
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
    
          }
  
        };
  return (
    <Box m="20px" mt="-30px">
      <Box display="flex" justifyContent="space-between" alignItems="center" >
       
       <Header title="CLIENTS" subtitle="Managing the list of clients" />

     
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
      >
        <DataGrid checkboxSelection rows={client} columns={[...columns,actionColumn]} components={{ Toolbar: GridToolbar }} />
      </Box>
    </Box>
  );
};

export default Client;
