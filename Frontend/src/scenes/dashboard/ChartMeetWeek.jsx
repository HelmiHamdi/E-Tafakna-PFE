import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Chart.css";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { getDay, parseISO } from "date-fns";


const ChartMeetWeek = () => {
   const { currentUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  
  
 useEffect(() => {
   const test = async () => {
     try {
     

        const meet = await axios.post(
        "http://localhost:8800/api/link/getLinksByLoyer",
        {
          loyer_id: currentUser.id,
        }
        );

       setMeetings(meet.data)
     } catch (error) {
       console.error("Error fetching data:", error);
     }
   };
   test();
 
 }, [currentUser]);
const data  = getMeetingsCountByWeekDay(meetings);
  
  return (
   
    <Box m="20px" mt="-30px" >
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center" >
     
      <Header title="LINE CHART" subtitle="Welcome to your charts " />

    
    </Box>
     
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="meet" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ChartMeetWeek;
function getMeetingsCountByWeekDay(meetings) {
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const data = weekDays.map(day => ({ name: day, meet: 0 }));

  meetings.forEach(meeting => {
    const dayOfWeek = getDay(parseISO(meeting.date)); // Get the day of week index (0-6)
    data[dayOfWeek].meet++; // Increment the count for the respective day
  });

  return data;
}