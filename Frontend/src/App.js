// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import Topbar from "./scenes/global/Topbar";
// import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from "./scenes/dashboard";
// import Client from "./scenes/clients";
// import Chat from "./scenes/chat";
// import Meetings from "./scenes/Meeting";
// import Bar from "./scenes/bar";
// import Profile from "./scenes/profile";

// import PieChartBox from "./scenes/pie";
// import Files from "./scenes/Files";
// import Notes from "./scenes/Notes";
// import Login from "./scenes/login";
// import Geography from "./scenes/geography";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";

// import { AuthContextProvider } from "./context/authContext";
// import ChartMeetMonth from "./scenes/dashboard/ChartMeetMonth";
// import ChartMeetWeek from "./scenes/dashboard/ChartMeetWeek";
// import ChartNewClient from "./scenes/dashboard/ChartNewClient";
// import BarChartBox from "./scenes/dashboard/BarChartBox";
// import Loyer from "./scenes/loyer";

// import LoginChat from "./components/ChatApp/loginChat/login";


// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <AuthContextProvider>
//       <ColorModeContext.Provider value={colorMode}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <div className="app">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/logout" element={<Login />} />
            
//               <Route
//                 path="/*"
//                 element={
//                   <>
//                     {isSidebar && <Sidebar />}
//                     <main className="content">
//                       <Topbar setIsSidebar={setIsSidebar} />
//                       <Routes>
//                         <Route path="/" element={<Dashboard />} />
//                         <Route path="/client" element={<Client />} />
//                         <Route path="/meet" element={<Meetings />} />
//                         <Route path="/chat" element={<Chat />} />
//                         <Route path="/loyer" element={<Loyer />} />
//                         <Route path="/calendar" element={<Calendar />} />
//                         <Route path="/profile" element={<Profile />} />
//                         <Route path="/bar" element={<Bar />} />
//                         <Route path="/pie" element={<PieChartBox />} />
                      
//                         <Route path="/logchat" element={<LoginChat />} />

//                         <Route path="/notes" element={<Notes />} />
//                         <Route path="/files" element={<Files />} />
//                         <Route path="/geography" element={<Geography />} />
//                         <Route
//                           path="/chartMeetMonth"
//                           element={<ChartMeetMonth />}
//                         />
//                         <Route
//                           path="/chartMeetWeek"
//                           element={<ChartMeetWeek />}
//                         />
//                         <Route
//                           path="/chartNewClient"
//                           element={<ChartNewClient />}
//                         />
//                         <Route path="/barChartBox" element={<BarChartBox />} />
//                       </Routes>
//                     </main>
                   
//                   </>
//                 }
//               />
//             </Routes>
//           </div>
//         </ThemeProvider>
//       </ColorModeContext.Provider>
//     </AuthContextProvider>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Client from "./scenes/clients";
import Chat from "./scenes/chat";
import Meetings from "./scenes/Meeting";
import Bar from "./scenes/bar";
import Profile from "./scenes/profile";
import PieChartBox from "./scenes/pie";
import Files from "./scenes/Files";
import Notes from "./scenes/Notes";
import Login from "./scenes/login";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import { AuthContextProvider } from "./context/authContext";
import ChartMeetMonth from "./scenes/dashboard/ChartMeetMonth";
import ChartMeetWeek from "./scenes/dashboard/ChartMeetWeek";

import BarChartBox from "./scenes/dashboard/BarChartBox";
import Loyer from "./scenes/loyer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoute";
import Chatbot from "./scenes/chatboot/chatbot";
import Selection from "./scenes/chat/selection";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8800/api/auth/logout', {}, { withCredentials: true });
      console.log(response.data);
      // Utiliser navigate pour rediriger
      navigate('/login');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <AuthContextProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route onClick={handleLogout} path="/logout" element={<Login />} />
              <Route
                path="/*"
                element={
                  <>
                    {isSidebar && <Sidebar />}
                    <main className="content">
                      <Topbar setIsSidebar={setIsSidebar} />
                      <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                        <Route path="/client" element={<PrivateRoute element={Client} />} />
                        <Route path="/meet" element={<PrivateRoute element={Meetings} />} />
                        <Route path="/chat" element={<PrivateRoute element={Chat} />} />
                        <Route path="/loyer" element={<PrivateRoute element={Loyer} />} />
                        <Route path="/calendar" element={<PrivateRoute element={Calendar} />} />
                        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
                        <Route path="/bar" element={<PrivateRoute element={Bar} />} />
                        <Route path="/pie" element={<PrivateRoute element={PieChartBox} />} />
                        <Route path="/selection" element={<PrivateRoute element={Selection} />} />
                        <Route path="/notes" element={<PrivateRoute element={Notes} />} />
                        <Route path="/files" element={<PrivateRoute element={Files} />} />
                        <Route path="/geography" element={<PrivateRoute element={Geography} />} />
                        <Route path="/chartMeetMonth" element={<PrivateRoute element={ChartMeetMonth} />} />
                        <Route path="/chartMeetWeek" element={<PrivateRoute element={ChartMeetWeek} />} />
                        <Route path="/chatboot" element={<PrivateRoute element={Chatbot} />} />
                        
                        <Route path="/barChartBox" element={<PrivateRoute element={BarChartBox} />} />
                      </Routes>
                    </main>
                  </>
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
