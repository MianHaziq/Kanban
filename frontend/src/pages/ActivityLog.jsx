import React, { useState, useEffect } from "react";
import axios from "axios";
import Log_Card from "../components/LogTable";
import { fetchData } from "../services/logService";

function ActivityLog() {
  const [log, setLog] = useState([]); 

  useEffect(() => {
    const getlogs = async () => {
      const response= await fetchData();
setLog(response);
    };
  
    getlogs();
  }, []);
  

  return (
    <>
     <div className="block p-6  bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:bg-slate-800 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-white dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-slate-900 dark:bg-gray-700 dark:text-gray-400">
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

export default ActivityLog;
