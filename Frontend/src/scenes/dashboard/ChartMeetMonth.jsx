import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Chart.css";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { getWeek, parseISO, startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";


const ChartMeetMonth = () => {
     const { currentUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);
  
   useEffect(() => {
   const test = async () => {
     try {
       const result = await axios.get(
         "http://localhost:8800/api/loyers/getLoyers",
        
       );

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
const data  = getMeetingCountsByWeekForCurrentMonth(meetings);
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

export default ChartMeetMonth;





function getMeetingCountsByWeekForCurrentMonth(meetings) {
  const now = new Date();
  const firstDayOfMonth = startOfMonth(now);
  const lastDayOfMonth = endOfMonth(now);
  const weeks = eachWeekOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth
  }, { weekStartsOn: 1 });

  const weeklyCounts = weeks.map((week, index) => ({
    name: `Week${index + 1}`,
    meet: 0
  }));

  meetings.forEach(meeting => {
    const meetingDate = parseISO(meeting.date);
    if (meetingDate >= firstDayOfMonth && meetingDate <= lastDayOfMonth) {
      const meetingWeek = getWeek(meetingDate) - getWeek(firstDayOfMonth) + 1;
      if (meetingWeek >= 1 && meetingWeek <= weeklyCounts.length) {
        weeklyCounts[meetingWeek - 1].meet++;
      }
    }
  });

  return weeklyCounts;
}
