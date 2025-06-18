import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';

export default function Tickets() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('csvData') || '[]');
    setData(stored);
  }, []);

  const filteredData = data.filter(item =>
    (item['件名'] && item['件名'].toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item['申請者名'] && item['申請者名'].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 w-full">
        <h1 className="text-3xl font-semibold mb-6">チケット一覧</h1>
        <input
          type="text"
          placeholder="件名または申請者名で検索"
          className="w-full max-w-md mb-6 px-4 py-2 border rounded shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {filteredData.map((item, index) => (
            <Link href={`/ticket/${index}`} key={index}>
              <div className="cursor-pointer border rounded-xl p-5 bg-white shadow hover:shadow-md transition mb-8">
                <p className="text-xs text-gray-500 mb-1">No: {item['No'] || index + 1}</p>
                <p className="text-lg font-bold text-gray-800">{item['件名'] || '件名なし'}</p>
                <p className="text-sm text-gray-600">WFコード: {item['WFコード'] || 'なし'}</p>
                <p className="text-sm text-gray-600">申請者名: {item['申請者名'] || '不明'}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}