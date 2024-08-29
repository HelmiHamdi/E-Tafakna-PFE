// // import { Box, Input, Typography } from "@mui/material";
// // import React, { useState } from "react";
// // import { useSearchParams } from "react-router-dom";
// // import useSWR from "swr";
// // import { fetcher } from "../../utils/fetcher";
// // import axios from "axios";
// // import { useContext } from "react";
// // import { AuthContext } from "../../context/authContext";
// // import { Row, Col, Button } from 'antd';
// // import { IoSendOutline } from 'react-icons/io5';

// // const ChatSection = () => {
// //   const { currentUser } = useContext(AuthContext);
// //   const [loading, setLoading] = useState(false);
// //   let [searchParams, setSearchParams] = useSearchParams();
// //   const loyerId = searchParams.get("loyer");

// //   const [message, setMessage] = useState("");

// //   const { data: loyers } = useSWR(
// //     `http://localhost:8800/api/loyers/getLoyers`,
// //     fetcher
// //   );
// //   const { data: chats } = useSWR(
// //     `http://localhost:8800/api/chat/` + currentUser.id,
// //     fetcher,
// //     {
// //       refreshInterval: 1000,
// //     }
// //   );

// //   const loyer = loyers?.find((loyer) => loyer.id == loyerId);

// //   if (!loyer) return null;

// //   return (
// //     <Box p={2}>
// //       <Box display={"flex"}>
// //         <img
// //           src={loyer?.picture}
// //           alt="profile"
// //           style={{ width: 40, height: 40, borderRadius: 50 }}
// //         />
// //         <Typography variant="h3" style={{ marginLeft: 10 }}>
// //           {loyer.name} {loyer.last_names}
// //         </Typography>
// //       </Box>
// //       <Box height={"calc(100vh - 290px)"}>
// //         {chats
// //           ?.filter(
// //             (chat) =>
// //               (chat.sender === currentUser.id && chat.receiver == loyerId) ||
// //               (chat.sender == loyerId && chat.receiver === currentUser.id)
// //           )
// //           ?.map((chat) => (
// //             <Box
// //               key={chat.id}
// //               display="flex"
// //               justifyContent={
// //                 chat.sender === currentUser.id ? "flex-end" : "flex-start"
// //               }
// //             >
// //               <Box
// //                 style={{
// //                   backgroundColor:
// //                     chat.sender === currentUser.id ? "#f1f0f0" : "#007bff",
// //                   color: chat.sender === currentUser.id ? "black" : "white",
// //                   padding: 10,
// //                   borderRadius: 10,
// //                   marginTop: 10,
// //                 }}
// //               >
// //                 {chat.message}
// //               </Box>
// //             </Box>
// //           ))}
// //       </Box>
// //       <Box>
// //         <form
// //           onSubmit={async (e) => {
// //             e.preventDefault();
// //             await axios.post(`http://localhost:8800/api/chat`, {
// //               sender: currentUser.id,
// //               receiver: loyerId,
// //               message,
// //             });
// //             setMessage("");
// //           }}
// //         >
// //             <Row width={"100%"} >
// //     <Col span={23}>
// //  <input
// //             style={{
// //               backgroundColor: "#fafafa",
// //               width: "100%",
            
// //               color: "black",
// //               borderRadius: 99999,
// //               padding: "8px 12px",
// //                   fontSize: 16,
              
// //             }}
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //           />
// //     </Col>
// //             <Col span={1}>
// //               <Button
// //                 onClick={async (e) => {
// //                   if (!message) return;
// //                   setLoading(true); 
// //             e.preventDefault();
// //             await axios.post(`http://localhost:8800/api/chat`, {
// //               sender: currentUser.id,
// //               receiver: loyerId,
// //               message,
// //             });
// //                   setLoading(false);
// //             setMessage("");
// //                 }}
// //                 loading={loading}
// //                 icon={<IoSendOutline size={24} />}
// //               >

// //               </Button>

// //     </Col>
// //   </Row>
          

// //         </form>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default ChatSection;
// /******************************************** */
// import { fetcher } from "../../utils/fetcher";
// import { Box, Input, Typography, Button } from "@mui/material";
// import React, { useState, useContext } from "react";
// import { useSearchParams } from "react-router-dom";
// import useSWR from "swr";
// import axios from "axios";
// import { AuthContext } from "../../context/authContext";
// import { IoSendOutline } from 'react-icons/io5';

// const ChatSection = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   let [searchParams] = useSearchParams();
//   const loyerId = searchParams.get("loyer");

//   const [message, setMessage] = useState("");

//   const { data: loyers } = useSWR(
//     `http://localhost:8800/api/loyers/getLoyers`,
//     fetcher
//   );
//   const { data: chats } = useSWR(
//     `http://localhost:8800/api/chat/` + currentUser.id,
//     fetcher,
//     {
//       refreshInterval: 1000,
//     }
//   );

//   const loyer = loyers?.find((loyer) => loyer.id == loyerId);

//   if (!loyer) return null;

//   return (
//     <Box p={2} display="flex" flexDirection="column" height="100%">
//       <Box display="flex" alignItems="center" mb={2}>
//         <img
//           src={loyer?.picture}
//           alt="profile"
//           style={{ width: 40, height: 40, borderRadius: "50%" }}
//         />
//         <Typography variant="h6" ml={2}>
//           {loyer.name} {loyer.last_names}
//         </Typography>
//       </Box>
//       <Box
//         flex={1}
//         overflow="auto"
//         mb={1}
        
//         borderColor="grey.300"
//         borderRadius={2}
//         p={1}
//       >
//         {chats
//           ?.filter(
//             (chat) =>
//               (chat.sender === currentUser.id && chat.receiver == loyerId) ||
//               (chat.sender == loyerId && chat.receiver === currentUser.id)
//           )
//           ?.map((chat) => (
//             <Box
//               key={chat.id}
//               display="flex"
//               justifyContent={
//                 chat.sender === currentUser.id ? "flex-end" : "flex-start"
//               }
//               mb={1}
//             >
//               <Box
//                 bgcolor={
//                   chat.sender === currentUser.id ? "grey.300" : "#007BFF"
//                 }
//                 color={chat.sender === currentUser.id ? "text.primary" : "white"}
//                 p={1}
//                 borderRadius={2}
//               >
//                 {chat.message}
//               </Box>
//             </Box>
//           ))}
//       </Box>
//       <Box component="form"
//         onSubmit={async (e) => {
//           e.preventDefault();
//           await axios.post(`http://localhost:8800/api/chat`, {
//             sender: currentUser.id,
//             receiver: loyerId,
//             message,
//           });
//           setMessage("");
//         }}
//         display="flex"
//         alignItems="center"
//       >
//        <input
//   value={message}
//   onChange={(e) => setMessage(e.target.value)}
//   placeholder="Type your message..."
//   style={{
//     width:"85%",
//     borderRadius: "20px",
//     padding: "12px",
//     border: "2px solid #007BFF", // Couleur de la bordure
//     backgroundColor: "#f0f0f0", // Couleur de fond
//     fontSize: "14px",
//     color: "#333", // Couleur du texte
//     outline: "none", // Supprimer la bordure de mise au point
//   }}
// />

// <Button
//   type="submit"
//   variant="contained"
//   disabled={loading}
//   endIcon={<IoSendOutline />}
//   style={{
//     marginLeft:"20px",
//     width:"10%",
  
//     backgroundColor: "#007BFF", // Couleur de fond
//     color: "#fff", // Couleur du texte
//     borderRadius: "20px", // Bordure arrondie
//     // Espacement intérieur
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Ombre légère
//     transition: "background-color 0.3s", // Animation de transition
//     cursor: "pointer", // Curseur au survol
//     border: "none", // Supprimer la bordure
//     outline: "none", // Supprimer la bordure de mise au point
//     fontWeight: "bold", // Texte en gras
//     fontSize: "14px", // Taille de la police
//   }}
// >
//   Send
// </Button>

//       </Box>
//     </Box>
//   );
// };

// export default ChatSection;
// import { fetcher } from "../../utils/fetcher";
// import { Box,  Typography, Button } from "@mui/material";
// import React, { useState, useContext } from "react";
// import { useSearchParams } from "react-router-dom";
// import useSWR from "swr";
// import axios from "axios";
// import { AuthContext } from "../../context/authContext";
// import { IoSendOutline } from 'react-icons/io5';
// import { format } from 'date-fns';

// const ChatSection = () => {
//   const { currentUser } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);
//   let [searchParams] = useSearchParams();
//   const loyerId = searchParams.get("loyer");

//   const [message, setMessage] = useState("");

//   const { data: loyers } = useSWR(
//     `http://localhost:8800/api/loyers/getLoyers`,
//     fetcher
//   );
//   const { data: chats } = useSWR(
//     `http://localhost:8800/api/chat/` + currentUser.id,
//     fetcher,
//     {
//       refreshInterval: 1000,
//     }
//   );

//   const loyer = loyers?.find((loyer) => loyer.id == loyerId);

//   if (!loyer) return null;

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     await axios.post(`http://localhost:8800/api/chat`, {
//       sender: currentUser.id,
//       receiver: loyerId,
//       message,
//     });
//     setMessage("");
//   };

//   return (
//     <Box p={2} display="flex" flexDirection="column" height="100%">
//       <Box display="flex" alignItems="center" mb={2}>
//         <img
//           src={loyer?.picture}
//           alt="profile"
//           style={{ width: 40, height: 40, borderRadius: "50%" }}
//         />
//         <Typography variant="h6" ml={2}>
//           {loyer.name} {loyer.last_names}
//         </Typography>
//       </Box>
//       <Box
//         flex={1}
//         overflow="auto"
//         mb={1}
//         borderColor="grey.300"
//         borderRadius={2}
//         p={1}
//       >
//         {chats
//           ?.filter(
//             (chat) =>
//               (chat.sender === currentUser.id && chat.receiver == loyerId) ||
//               (chat.sender == loyerId && chat.receiver === currentUser.id)
//           )
//           ?.map((chat) => (
//             <Box
//               key={chat.id}
//               display="flex"
//               flexDirection="column"
//               alignItems={
//                 chat.sender === currentUser.id ? "flex-end" : "flex-start"
//               }
//               mb={1}
//             >
//               <Box
//                 bgcolor={
//                   chat.sender === currentUser.id ? "grey.300" : "#007BFF"
//                 }
//                 color={chat.sender === currentUser.id ? "text.primary" : "white"}
//                 p={1}
//                 borderRadius={2}
//                 mb={1}
//               >
//                 {chat.message}
//               </Box>
//               <Typography variant="caption" color="textSecondary">
//                 {format(new Date(chat.createdAt), "HH:mm:ss")}
//               </Typography>
//             </Box>
//           ))}
//       </Box>
//       <form onSubmit={sendMessage} style={{ display: "flex", alignItems: "center" }}>
//       <input
//   value={message}
//   onChange={(e) => setMessage(e.target.value)}
//   placeholder="Type your message..."
//   style={{
//     width:"85%",
//     borderRadius: "20px",
//     padding: "12px",
//     border: "2px solid #007BFF", // Couleur de la bordure
//     backgroundColor: "#f0f0f0", // Couleur de fond
//     fontSize: "14px",
//     color: "#333", // Couleur du texte
//     outline: "none", // Supprimer la bordure de mise au point
//   }}
// />
//        <Button
//   type="submit"
//   variant="contained"
//   disabled={loading}
//   endIcon={<IoSendOutline />}
//   style={{
//     marginLeft:"20px",
//     width:"10%",
  
//     backgroundColor: "#007BFF", // Couleur de fond
//     color: "#fff", // Couleur du texte
//     borderRadius: "20px", // Bordure arrondie
//     // Espacement intérieur
//     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Ombre légère
//     transition: "background-color 0.3s", // Animation de transition
//     cursor: "pointer", // Curseur au survol
//     border: "none", // Supprimer la bordure
//     outline: "none", // Supprimer la bordure de mise au point
//     fontWeight: "bold", // Texte en gras
//     fontSize: "14px", // Taille de la police
//   }}
// >
//   Send
// </Button>
//       </form>
//     </Box>
//   );
// };

// export default ChatSection;
import { fetcher } from "../../utils/fetcher";
import { Box, Typography, Button } from "@mui/material";
import React, { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import { IoSendOutline } from 'react-icons/io5';
import { format } from 'date-fns';

const ChatSection = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  let [searchParams] = useSearchParams();
  const loyerId = searchParams.get("loyer");

  const [message, setMessage] = useState("");

  const { data: loyers } = useSWR(
    `http://localhost:8800/api/loyers/getLoyers`,
    fetcher
  );
  const { data: chats } = useSWR(
    `http://localhost:8800/api/chat/` + currentUser.id,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  const loyer = loyers?.find((loyer) => loyer.id == loyerId);

  if (!loyer) return null;

  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:8800/api/chat`, {
      sender: currentUser.id,
      receiver: loyerId,
      message,
    });
    setMessage("");
  };

  return (
    <Box p={2} display="flex" flexDirection="column" height="100%">
      <Box display="flex" alignItems="center" mb={2}>
        <img
          src={loyer?.picture}
          alt="profile"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <Typography variant="h6" ml={2}>
          {loyer.name} {loyer.last_names}
        </Typography>
      </Box>
      <Box
        flex={1}
        overflow="auto"
        mb={1}
        borderColor="grey.300"
        borderRadius={2}
        p={1}
      >
        {chats
          ?.filter(
            (chat) =>
              (chat.sender === currentUser.id && chat.receiver == loyerId) ||
              (chat.sender == loyerId && chat.receiver === currentUser.id)
          )
          ?.map((chat) => (
            <Box
              key={chat.id}
              display="flex"
              flexDirection="column"
              alignItems={
                chat.sender === currentUser.id ? "flex-end" : "flex-start"
              }
              mb={1}
            >
              <Box
                display="flex"
                alignItems="center"
                bgcolor={
                  chat.sender === currentUser.id ? "grey.300" : "#007BFF"
                }
                color={chat.sender === currentUser.id ? "text.primary" : "white"}
                p={1}
                borderRadius={2}
                mb={1}
              >
                {chat.sender !== currentUser.id && (
                  <img
                    src={loyer?.picture}
                    alt="profile"
                    style={{ width: 20, height: 20, borderRadius: "50%", marginRight: 8 }}
                  />
                )}
                {chat.sender === currentUser.id && (
                  <img
                    src={currentUser?.picture}
                    alt="profile"
                    style={{ width: 20, height: 20, borderRadius: "50%", marginRight: 8 }}
                  />
                )}
                <Typography>
                  {chat.message}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary">
                {format(new Date(chat.createdAt), "HH:mm:ss")}
              </Typography>
            </Box>
          ))}
      </Box>
      <form onSubmit={sendMessage} style={{ display: "flex", alignItems: "center" }}>
        <input
  value={message}
  onChange={(e) => {
    if (e.target.value.length > 20) {
      e.target.style.height = "auto";
      e.target.style.height = e.target.scrollHeight + "px";
    }
    setMessage(e.target.value);
  }}
  placeholder="Type your message..."
  style={{
    width:"85%",
    borderRadius: "20px",
    padding: "12px",
    border: "2px solid #007BFF", // Couleur de la bordure
    backgroundColor: "#f0f0f0", // Couleur de fond
    fontSize: "14px",
    color: "#333", // Couleur du texte
    outline: "none", // Supprimer la bordure de mise au point
    overflow: "hidden", // Masquer le débordement
    resize: "none", // Désactiver le redimensionnement
    minHeight: "48px", // Hauteur minimale de l'input
  }}
/>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          endIcon={<IoSendOutline />}
          style={{
            marginLeft:"20px",
            width:"10%",
            backgroundColor: "#007BFF", // Couleur de fond
            color: "#fff", // Couleur du texte
            borderRadius: "20px", // Bordure arrondie
            // Espacement intérieur
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Ombre légère
            transition: "background-color 0.3s", // Animation de transition
            cursor: "pointer", // Curseur au survol
            border: "none", // Supprimer la bordure
            outline: "none", // Supprimer la bordure de mise au point
            fontWeight: "bold", // Texte en gras
            fontSize: "14px", // Taille de la police
          }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ChatSection;
