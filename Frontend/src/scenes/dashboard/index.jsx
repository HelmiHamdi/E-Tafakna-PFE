import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import 'react-toastify/dist/ReactToastify.css';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header/Header";

import StatBox from "../../components/StatBox/StatBox";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./dashboard.css";

import { isWithinInterval, parseISO, startOfMonth, endOfMonth,startOfWeek, endOfWeek } from "date-fns";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 const { currentUser } = useContext(AuthContext);
  const [client, setClient] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [bestClient, setBestClient] = useState([]);






  
 useEffect(() => {
   const test = async () => {
     try {
       const result = await axios.post(
         "http://localhost:8800/api/link/getUsersByLoyer",
         {
          loyer_id: currentUser.id,
        }
        
       );
        const meet = await axios.post(
        "http://localhost:8800/api/link/getLinksByLoyer",
        {
          loyer_id: currentUser.id,
        }
        );
       
      const clientCount = {};
meet.data.forEach(client => {
  const clientKey = JSON.stringify(client); // Using JSON.stringify to create a unique key
  clientCount[clientKey] = (clientCount[clientKey] || 0) + 1;
});

// Step 2: Sort clients based on occurrence count in descending order
const sortedClients = Object.entries(clientCount)
  .sort(([, countA], [, countB]) => countB - countA)
  .map(([clientKey]) => JSON.parse(clientKey)); // Parsing JSON to get back the original client object

       const topTwoClients = sortedClients.slice(0, 10);
        setBestClient(topTwoClients);

       setClient(result.data); // Définir les données de l'utilisateur dans le state
       setMeetings(meet.data)
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
   test();
 
 }, [currentUser]);
  

  

  return (
    <Box m="20px" mt="-30px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" >
       
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard " />

      
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        height={"100%"}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={getMeetingsForCurrentWeek(meetings)?.length}
            subtitle="Total Meetings"
        
            increase="This Week"

            icon={
             
              <Link to='/chartMeetWeek'>
              <span className="icon-wrapper" title="Click here to view all">
                <VideocamOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              </span>
            </Link>
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={getMeetingsForCurrentMonth(meetings)?.length}
            subtitle="Meetings"
        
            increase="This Month"

            icon={
             
              <Link to='/chartMeetMonth'>
              <span className="icon-wrapper" title="Click here to view all">
                <VideocamOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              </span>
            </Link>
            }
          />
        </Box>
      
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={client?.length}
            subtitle="Total clients"
      
           /* increase="this Month"*/

            icon={
              <Link to='/barChartBox'>
              <span className="icon-wrapper" title="Click here to view all">
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
                 </span>
            </Link>
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        height={340}

        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Top Clients
            </Typography>
          </Box>
          {bestClient?.map((client, i) => (
            <Box
              key={`${client.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                {client.image ? (
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={client.image}
                  alt="clients"
                />
                 
                ):  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="clients"
                  />}
               
              </Box>
              <Box>
                <Typography color={colors.grey[100]}>
                  {client.first_name} 
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{client.last_name}</Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}

        <Box
          height={340}
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
          Client by location
          </Typography>
          <Box height="300px" mt="-40px">
            <PieChartBox isDashboard={true} />
          </Box>
        </Box>
       
      </Box>
    </Box>
  );
};

export default Dashboard;
function getMeetingsForCurrentMonth(meetings) {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  return meetings.filter(meeting => {
    const meetingDate = parseISO(meeting.date);
    return isWithinInterval(meetingDate, { start: startOfCurrentMonth, end: endOfCurrentMonth });
  });
}

function getMeetingsForCurrentWeek(meetings) {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 }); // Configure start of week to Monday
  const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 }); // Configure end of week to Sunday
  return meetings.filter(meeting => {
    const meetingDate = parseISO(meeting.date);
    return isWithinInterval(meetingDate, { start: startOfCurrentWeek, end: endOfCurrentWeek });
  });
}
