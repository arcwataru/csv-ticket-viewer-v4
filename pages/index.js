import { useState } from 'react';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const router = useRouter();
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const existing = JSON.parse(localStorage.getItem('csvData') || '[]');
        const combined = [...existing, ...results.data];
        setCsvData(combined);
        localStorage.setItem('csvData', JSON.stringify(combined));
        router.push('/tickets');
      },
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-10 w-full">
        <h1 className="text-4xl font-bold mb-6">CSV で起案情報を登録する</h1>
        <p className="mb-4 text-gray-600">CSVファイルをアップロードしてください。既存データに追加されます。</p>
        <input type="file" accept=".csv" onChange={handleFileUpload} className="border rounded px-4 py-2" />
      </main>
    </div>
  );
}
