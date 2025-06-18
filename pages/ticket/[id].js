import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function TicketDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('csvData') || '[]');
    if (id !== undefined) {
      setTicket(stored[Number(id)]);
    }
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 w-full">
        <h1 className="text-3xl font-semibold mb-6">起案詳細</h1>
        {ticket ? (
          <div className="space-y-4">
            {Object.entries(ticket).map(([key, value]) => (
              <div key={key} className="grid grid-cols-4 items-start">
                <div className="font-medium text-gray-700">{key}</div>
                <div className="col-span-3 bg-white p-4 rounded border">{value}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>起案が見つかりません。</p>
        )}
      </main>
    </div>
  );
}
