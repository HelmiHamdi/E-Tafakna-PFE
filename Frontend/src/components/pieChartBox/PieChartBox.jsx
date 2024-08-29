// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
// import { dbPieChart } from "../../data/mockData";
// import "./PieChartBox.css";

// import axios from "axios";
// import { AuthContext } from "../../context/authContext";
// import { useState , useEffect } from "react";
// import { useContext } from "react";
// import { Box } from "@mui/material";


// const PieChartBox = () => {
//    const { currentUser } = useContext(AuthContext);
//  const [client, setClient] = useState([]);
//  useEffect(() => {
//    const test = async () => {
//      try {
//       const result = await axios.post(
//          "http://localhost:8800/api/link/getUsersByLoyer",
//          {
//           loyer_id: currentUser.id,
//          }
//         );
//        setClient(result.data); // Définir les données de l'utilisateur dans le state
//        console.log(result.data, "client");
//      } catch (error) {
//        console.error("Error fetching data:", error);
//      }
//    };
//    test();
 
//  }, [currentUser]);
//   const dbPieChart = processDataForPieChart(client);


//     return(
//         <Box className="pieChartBox" padding={2}>
//             <div className="chart">
//                <ResponsiveContainer width="100%" height={300}>
//                <PieChart>
//                 <Tooltip
//                  contentStyle={{background:"white", borderRadius:"5px" }}
//                 />
//         <Pie
//           data={dbPieChart}
//         //   cx={145}
//         // cy={100}
//           innerRadius={"70%"}
//           outerRadius={"90%"}
//           paddingAngle={5}
//           dataKey="value"
//         >
//           {dbPieChart.map((item) => (
//             <Cell key={item.name} fill={item.color} />
//           ))}
//         </Pie>
        
//       </PieChart>
//                </ResponsiveContainer>
//             </div>
//             <div className="options">
//                 {dbPieChart.map((item)=>(
                    
//                         <div className="title">
//                             <div className="dot" style={{backgroundColor:item.color}}/>
                               
                            
//                         </div>
                   
//                 ))}
//             </div>
//         </Box>
//     )
// }
// export default PieChartBox;
// const generateRandomColor = () => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// // Function to process data for pie chart
// const processDataForPieChart = (clients) => {
//   const filteredData = clients?.filter(item => item.address !== null);
// const data =filteredData.map(client => ({
//     name: client?.address?.charAt(0)?.toUpperCase() + client?.address?.slice(1), // Capitalize first letter
//     value: 1, // You can set this to any value you want
//     color: generateRandomColor() // Generate a random color for each entry
//   }));
// const occurrenceMap = new Map();

// data.forEach(item => {
//   const trimmedName = item.name.trim();
//   if (trimmedName) {
//     if (occurrenceMap.has(trimmedName)) {
//       occurrenceMap.get(trimmedName).value += 1;
//     } else {
//       occurrenceMap.set(trimmedName, { ...item, name: trimmedName, value: 1 });
//     }
//   }
// });


// const uniqueData = Array.from(occurrenceMap.values());
//   return uniqueData;
// };
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import "./PieChartBox.css";

const PieChartBox = () => {
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
        setClient(result.data); // Définir les données de l'utilisateur dans le state
        console.log(result.data, "client");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    test();
  }, [currentUser]);

  const dbPieChart = processDataForPieChart(client);

  return (
    <Box className="pieChartBox" padding={2}>
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: "white", borderRadius: "5px" }}
            />
            <Pie
              data={dbPieChart}
              innerRadius={"70%"}
              outerRadius={"90%"}
              paddingAngle={5}
              dataKey="value"
            >
              {dbPieChart.map((item, index) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {dbPieChart.map((item, index) => (
          <div key={index} className="title">
            <div className="dot" style={{ backgroundColor: item.color }} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default PieChartBox;

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const processDataForPieChart = (clients) => {
  const filteredData = clients?.filter(item => item.address !== null);
  const data = filteredData.map(client => ({
    name: client?.address?.charAt(0)?.toUpperCase() + client?.address?.slice(1), // Capitalize first letter
    value: 1, // You can set this to any value you want
    color: generateRandomColor() // Generate a random color for each entry
  }));

  const occurrenceMap = new Map();

  data.forEach(item => {
    const trimmedName = item.name.trim();
    if (trimmedName) {
      if (occurrenceMap.has(trimmedName)) {
        occurrenceMap.get(trimmedName).value += 1;
      } else {
        occurrenceMap.set(trimmedName, { ...item, name: trimmedName, value: 1 });
      }
    }
  });

  const uniqueData = Array.from(occurrenceMap.values());
  return uniqueData;
};
