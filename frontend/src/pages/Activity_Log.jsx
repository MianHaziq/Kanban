import React, { useState, useEffect } from "react";
import axios from "axios";
import Log_Card from "../components/LogTable";

function Activity_Log() {
  const [log, setLog] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3003/log/");
        console.log("API Response:", response.data.log); 
        setLog(response.data.log );
        console.log(log);
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLog([]);
      }

    };
  
    fetchData();
  }, []);
  

  return (
    <>
     <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Created By</th>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Old Status</th>
              <th scope="col" className="px-6 py-3">New Status</th>
              <th scope="col" className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {log && log.map((log, index) => <Log_Card key={index} log={log} />)}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Activity_Log;
