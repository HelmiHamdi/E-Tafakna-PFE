// import { Box, IconButton, useTheme } from "@mui/material";
// import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";

// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

// import { Link } from "react-router-dom";

// const Topbar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const colorMode = useContext(ColorModeContext);

//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       {/* SEARCH BAR */}
//       <Box
//         display="flex"
//         backgroundColor={colors.primary[400]}
//         borderRadius="3px"
//       >

//       </Box>

//       {/* ICONS */}
//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton>
//           <NotificationsOutlinedIcon />
//         </IconButton>
//         <IconButton >
//         <PersonOutlinedIcon/>
//          {/* <Link to="/profile"><PersonOutlinedIcon/></Link> */}
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default Topbar;
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useState } from "react";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  // État pour le pop-up
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* Votre barre de recherche ici */}
      </Box>

      {/* ICONS */}
      <Box display="flex" position="relative">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handlePopupToggle}>
          <PersonOutlinedIcon />
        </IconButton>
        {showPopup && (
          <Box
            position="absolute"
            top="50px"
            right="0"
            width="200px"
            bgcolor={colors.primary[400]}
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="8px"
            zIndex="10"
            p={2}
          >
            <Typography variant="h3"  mb={1}>
              Menu
            </Typography>
            <Box display="flex" flexDirection="column">
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                <AccountCircleOutlinedIcon style={{ marginRight: '8px' }} />
                Profile
              </Link>

              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit', margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                <HomeOutlinedIcon style={{ marginRight: '8px' }} />
                Dashboard
              </Link>
              <Link to="/logout" style={{ textDecoration: 'none', color: 'inherit', margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                <LogoutOutlinedIcon style={{ marginRight: '8px' }} />
                Logout
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
