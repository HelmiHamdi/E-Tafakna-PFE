import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../components/GeographyChart/GeographyChart";
import Header from "../../components/Header/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px" mt="-30px">
   
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="GEOGRAPHY" subtitle="Simple Geography Chart"  />
      </Box>
      <Box
     
        height="74vh"
        
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Geography;
