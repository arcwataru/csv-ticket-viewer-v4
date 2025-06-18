// pages/delete.js
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
      <main className="p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">チケット削除</h1>
        {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}
        {tickets.map((ticket, index) => (
          <div key={index} className="flex items-center justify-between border border-gray-300 rounded-xl p-4 mb-4 bg-white shadow-sm">
            <div>
              <p className="font-bold">No: {ticket['No'] || index + 1}</p>
              <p className="text-sm text-gray-700">件名: {ticket['件名'] || '未設定'}</p>
              <p className="text-sm text-gray-700">申請者: {ticket['申請者名'] || '不明'}</p>
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
