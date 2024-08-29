
import React, { useState, useContext } from 'react';
import {
  Box, Button, Card, CardContent, Dialog,
  DialogContent, DialogTitle, Typography, Grid, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import Header from "../../components/Header/Header";
import { countries } from 'countries-list';
import { AuthContext } from "../../context/authContext";
import axios from 'axios';
import { Form, Input } from 'antd';
import Select from 'react-select';
import "./profile.css";

const useStyles = makeStyles((theme) => ({

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: theme.palette.background.default,
  },
  card: {
    maxWidth: 600,
    width: '80%', // Full width for responsiveness
   marginTop:"20px",

    position: 'relative',
 
  },
 
  table: {
    minWidth: 500,
  },

}));

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [country, setCountry] = useState(currentUser?.country);
  const [expertise, setExpertise] = useState(currentUser?.role);
  const [userData, setUserData] = useState({
    id: currentUser?.id,
    name: currentUser?.name,
    last_names: currentUser?.last_names,
    role: currentUser?.role,
    country: currentUser?.country,
    region: currentUser?.region,
    addresse: currentUser?.addresse,
    email: currentUser?.email,
    phone_Number: currentUser?.phone_Number,
    bio: currentUser?.bio
  });
  const [form] = Form.useForm();
  const countryList = Object.values(countries);

  const onSubmit = async (values) => {
    try {
      const loyer = await axios.post(
        "http://localhost:8800/api/loyers/getLoyerByEmail/",
        { email: values.email }
      );
      const response = await axios.put(
        "http://localhost:8800/api/loyers/updateLoyer",
        {
          name: values.firstName,
          last_names: values.lastName,
          country: country,
          region: values.region,
          addresse: values.address,
          phone_Number: values.phone,
          email: values.email,
          picture: currentUser.picture,
          gender: currentUser.gender,
          role: expertise,
          Proffessional_Number: currentUser.Proffessional_Number,
          id: loyer?.data.id,
        }
      );
      const result = await axios.post(
        "http://localhost:8800/api/loyers/getLoyer/",
        { id: loyer?.data.id }
      );
      setUserData(result.data);
      setOpenDialog(false);
      localStorage.setItem("user", JSON.stringify(result.data));
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box m="20px" mt="-30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE" subtitle="Welcome to your profile" />
      </Box>

      <Box display="flex" justifyContent="center" marginTop="-60px">
        <Card className={classes.card} style={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          height:"500px",
     
        }}>
        
          <CardContent className={classes.cardContent}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.tableCell}>First Name</TableCell>
                    <TableCell>{userData?.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Last Name</TableCell>
                    <TableCell>{userData?.last_names}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Email</TableCell>
                    <TableCell>{userData?.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Country</TableCell>
                    <TableCell>{userData?.country}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Region</TableCell>
                    <TableCell>{userData?.region}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Address</TableCell>
                    <TableCell>{userData?.addresse}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Phone</TableCell>
                    <TableCell>{userData?.phone_Number}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.tableCell}>Expertise</TableCell>
                    <TableCell>{userData?.role}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
          <Grid container spacing={4} width="100%" justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
              
               style={{background: "#00e68e",marginTop:"15px"}}
                startIcon={<EditIcon />}
                className={classes.button}
                onClick={() => setOpenDialog(true)}
              >
               Edit
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ style: { backgroundColor: theme.palette.background.default } }}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <Form
            form={form}
            onFinish={onSubmit}
            initialValues={{
              firstName: userData?.name,
              lastName: userData?.last_names,
              email: userData?.email,
              country: userData?.country,
              region: userData?.region,
              address: userData?.addresse,
              phone: userData?.phone_Number,
              bio: userData?.bio,
            }}
            layout="vertical"
            style={{ width: "400px" }}
          >
            <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item name="country" label="Country" rules={[{ required: true, message: 'Please select your country!' }]}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{ value: userData?.country, label: userData?.country }}
                options={countryList.map(country => ({ value: country.name, label: country.name }))}
                onChange={option => setCountry(option.value)}
              />
            </Form.Item>
            <Form.Item name="region" label="Region" rules={[{ required: true, message: 'Please input your region!' }]}>
              <Input placeholder="Region" />
            </Form.Item>
            <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please input your address!' }]}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item name="expertise" label="Expertise">
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={{ value: userData?.role, label: userData?.role }}
                options={[
                  { value: 'lawyer', label: 'Lawyer' },
                  { value: 'finance', label: 'Finance' },
                ]}
                onChange={option => setExpertise(option.value)}
              />
            </Form.Item>
            <Button type="submit" color="primary" variant="contained">Update</Button>
            <Button onClick={() => setOpenDialog(false)} style={{marginLeft:"263px", background:"red"}} >Cancel</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Profile;
