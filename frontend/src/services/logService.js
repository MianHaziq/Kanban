import axios from "axios";

const Base_url = "http://localhost:3003/log/";

export  const fetchData = async () => {
    try {
      const response = await axios.get(`${Base_url}`);
    
    return  response.data.log;
    
    } catch (error) {
      console.error("Error fetching logs:", error);
     return [];
    }

  };