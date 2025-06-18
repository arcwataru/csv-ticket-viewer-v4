import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function DeletePage() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('csvData') || '[]');
    setTickets(data);
  }, []);

  const handleDelete = (indexToRemove) => {
    const confirmed = window.confirm('本当にこのチケットを削除しますか？');
    if (!confirmed) return;

    const newTickets = tickets.filter((_, index) => index !== indexToRemove);
    setTickets(newTickets);
    localStorage.setItem('csvData', JSON.stringify(newTickets));
    setMessage('チケットを削除しました。');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 w-full">
        <h1 className="text-3xl font-semibold mb-6">チケット削除</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>}
        {tickets.map((ticket, index) => (
          <div key={index} className="flex justify-between items-center bg-white p-4 rounded border shadow mb-4">
            <div>
              <p className="font-semibold">No: {ticket['No'] || index + 1}</p>
              <p className="text-gray-700 text-sm">件名: {ticket['件名']}</p>
              <p className="text-gray-700 text-sm">申請者: {ticket['申請者名']}</p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              削除
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}