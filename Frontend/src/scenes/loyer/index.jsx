import { Alert, Box, Button, Typography, useTheme } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { tokens } from "../../theme";

import Header from "../../components/Header/Header";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import { ChatOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Loyer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { data: loyers } = useSWR(
    `http://localhost:8800/api/loyers/getLoyers`,
    fetcher
  );
  const {
    data: invites,
    isLoading,
    mutate,
  } = useSWR(`http://localhost:8800/api/invite/` + currentUser.id, fetcher);

  return (
    <Box m="20px" mt="-30px">

      <Box display="flex" justifyContent="space-between" alignItems="center" >
       
       <Header title="USERS" subtitle="Welcome to your network"  />

     
     </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                First name
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Last name
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Email
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Phone number
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Address
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Region
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Country
              </TableCell>
              <TableCell style={{ fontWeight: 700, fontSize: 14 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loyers
              ?.filter((e) => e.id !== currentUser.id)
              .map((loyer) => {
                const invite = invites?.find(
                  (invite) =>
                    invite.sender === loyer.id || invite.receiver === loyer.id
                );

                return (
                  <TableRow
                    key={loyer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {loyer.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.last_names}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.phone_Number}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.addresse}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.region}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {loyer.country}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {!isLoading && invite && invite.isAccepted ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginRight: 10 }}
                          onClick={() => navigate(`/chat?loyer=${loyer.id}`)}
                        >
                          Chat
                        </Button>
                      ) : invite && invite.receiver === currentUser.id ? (
                        <div>
                          <Button
                          variant="contained"
                          color="success"
                          size="small"
                          style={{ marginRight: 10 }}
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await axios.put(
                                `http://localhost:8800/api/invite/` + invite.id
                              );
                              await mutate();
                            } catch (error) {
                              console.log(error);
                            }
                            setLoading(false);
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          style={{ marginRight: 10 }}
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await axios.delete(
                                `http://localhost:8800/api/invite/` + invite.id
                              );
                              await mutate();
                            } catch (error) {
                              console.log(error);
                            }
                            setLoading(false);
                          }}
                        >
                          Refuse
                        </Button>
                        </div>
                        
                      ) : invite ? (
                        <Alert
                          style={{ width: "110px", padding: "0px" }}
                          severity="warning"
                          size="small"
                          icon={<span />}
                        >
                          Invitation pending
                        </Alert>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{ marginRight: 10 }}
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await axios.post(
                                `http://localhost:8800/api/invite`,
                                {
                                  sender: currentUser.id,
                                  receiver: loyer.id,
                                }
                              );
                              await mutate();
                            } catch (error) {
                              console.log(error);
                            }
                            setLoading(false);
                          }}
                        >
                          Send invitation
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Loyer;
