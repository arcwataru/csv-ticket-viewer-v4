import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Link from 'next/link';

export default function TicketDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('csvData') || '[]');
    if (id !== undefined && data[Number(id)]) {
      setTicket(data[Number(id)]);
    }
  }, [id]);

  if (!ticket) return <div className="p-8">読み込み中...</div>;

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 w-full bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          {ticket['件名'] || `チケット詳細 #${id}`}
        </h1>
        <Link href="/tickets" className="text-blue-600 underline mb-4 inline-block">← チケット一覧に戻る</Link>
        <div className="space-y-4">
          {Object.entries(ticket).map(([key, value]) => (
            <div key={key} className="border p-4 rounded bg-white">
              <p className="text-sm text-gray-500 font-semibold">{key}</p>
              <p className="text-base whitespace-pre-wrap">{value}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
