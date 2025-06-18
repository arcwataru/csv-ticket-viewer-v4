import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-56 bg-white border-r border-gray-200 min-h-screen p-6 text-gray-900">
      <nav className="space-y-5 text-sm font-medium">
        <Link href="/tickets" className="block hover:text-blue-600">チケット一覧</Link>
        <Link href="/" className="block hover:text-blue-600">CSVアップロード</Link>
        <Link href="/delete" className="block hover:text-blue-600">チケット削除</Link>
      </nav>
    </div>
  );
}
