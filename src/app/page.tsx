import Link from 'next/link';
import DashboardTable from './DashboardTable';
import Search from './Search';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gray-100 p-4">
        <div>
          <Search />
        </div>
        <div className='flex justify-end px-4'>
          <Link href='/dashboard/new'>
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded">
              + CREATE NEW
            </button>
          </Link>
        </div>

        <div className='p-4 grid md:grid-cols-1 grid-cols-1'>
          <DashboardTable />
        </div>
      </main>
    </>

  )
}
