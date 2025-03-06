import React from 'react';

function Log_Card({ log }) {
  return (
    <>
    <tr className="bg-slate-800 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-slate-600 ">
      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">
       {log.createdBy.username}  
      </th>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 font-semibold rounded ${ log.action === 'update'  ? 'bg-yellow-500 text-white'   : log.action === 'create' ? 'bg-green-500 text-white'   : log.action === 'delete'  ? 'bg-red-500 text-white'     : 'bg-red-700 text-white'
          }`}
        >
          {log.action}
        </span>
      </td>
      <td className="px-6 py-4">{log.oldStatus}</td>
      <td className="px-6 py-4">{log.newStatus}</td>
      <td className="px-6 py-4">{new Date(log.createdAt).toLocaleString()}</td>
    </tr>
    </>
  );
}

export default Log_Card;
