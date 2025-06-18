import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('csvData') || '[]');
    setTickets(data);
  }, []);

  const filtered = tickets.filter(ticket => {
    return (
      (ticket['件名'] || '').includes(search) ||
      (ticket['申請者名'] || '').includes(search)
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">チケット一覧</h1>
        <input
          type="text"
          placeholder="件名または申請者名で検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border mb-6 w-full"
        />
        {filtered.map((ticket, index) => (
          <Link key={index} href={`/ticket/${index}`} className="block border rounded-xl p-4 mb-4 bg-white shadow-sm hover:shadow-md">
            <h2 className="text-lg font-semibold mb-1">No: {ticket['No'] || index + 1}</h2>
            <p className="font-bold">{ticket['件名'] || `チケット #${index + 1}`}</p>
            <p className="text-sm">申請者: {ticket['申請者名'] || '不明'}</p>
            <p className="text-sm">WFコード: {ticket['WFコード'] || '未設定'}</p>
          </Link>
        ))}
      </main>
    </div>
  );
}
