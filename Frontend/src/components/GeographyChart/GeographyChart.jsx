
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import axios from "axios";
import { geoFeatures } from "../../data/mockGeoFeatures";
import { tokens } from "../../theme";
import { AuthContext } from "../../context/authContext";

import { useContext } from "react";
const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [country, setCountry]=useState([])
  
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8800/api/link/getUsersByCountry",
        {
         loyer_id: currentUser.id,
        });
        const apiData = response.data;
        console.log(apiData , "apiData")
        setCountry(apiData)
        // Transformez les données de l'API pour qu'elles soient compatibles avec le format attendu par le composant ResponsiveChoropleth
        const transformedData = apiData.map(item => ({
          id: item.countryCode, // Assurez-vous que ceci correspond à l'ID de pays utilisé dans geoFeatures
          value: item.clientCount // Le nombre de clients ou autre valeur pertinente
        }));

        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
  <> 
     <ResponsiveChoropleth
      data={ [
        { id: "USA", value: 10 },
        { id: "FRA", value: 5 },
        { id: "DEU", value: 2 },
        { id: "BRA", value: 10 },
        { id: "RUS", value: 9 },
        { id: "CHN", value:4 },
        { id: "AUS", value: 3 },
        { id: "IND", value: 8 },
        { id: "CAN", value: 4 },
        { id: "TUN", value: 3 },
      ]}
     
      features={geoFeatures.features}
      margin={{ top: 136, right: 10, bottom: 10, left: 0 }}
      domain={[0, 100]}
      label="properties.name"
      valueFormat=".4s"
      projectionScale={isDashboard ? 40 : 130}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      borderColor="#0000"
      colors={["#7F5AF0"]}
    /> 
  </>
  );
};

export default GeographyChart;
