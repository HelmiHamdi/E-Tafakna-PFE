import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Chart.css";

const data = [
  { name: "Sun", client: 2 },
  { name: "Mon", client: 10},
  { name: "Tue", client:2 },
  { name: "Wed", client: 6 },
  { name: "Tuh", client:2 },
  { name: "Fri", client: 10 },
  { name: "Sat", client: 1 },
];

const BarChartBox = () => {
  return (
    <Box m="20px" mt="-30px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" >
       
        <Header title="BARCHART" subtitle="Welcome to your BarChart " />

      
      </Box>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          width={500}
          height={300}
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
          <Bar dataKey="client" fill="#8884d8" minPointSize={5}></Bar>
        </BarChart>
      </ResponsiveContainer>
   
    </Box>
  );
};
export default BarChartBox;
