import React from 'react';

function Log_Card({ log }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {log.createdby.Username}
      </th>
      <td className="px-6 py-4">
        <span
          className={`px-2 py-1 rounded ${ log.action === 'update'  ? 'bg-yellow-500 text-white'   : log.action === 'create' ? 'bg-green-500 text-white'   : log.action === 'delete'  ? 'bg-red-500 text-white'     : 'bg-red-700 text-white'
          }`}
        >
          {log.action}
        </span>
      </td>
      <td className="px-6 py-4">{log.oldstatus}</td>
      <td className="px-6 py-4">{log.newstatus}</td>
      <td className="px-6 py-4">{new Date(log.createdat).toLocaleString()}</td>
    </tr>
  );
}

export default Log_Card;
