'use client'
import { useState } from 'react'
import Link from 'next/link';
import DashboardTable from './DashboardTable';
import Search from '../components/Search';

export default function Home() {
  const [keyword, setKeyword] = useState('')

  const handleSearch = (query: any) => {
    setKeyword(query)
  }
  return (
    <>
      <main className="min-h-screen bg-gray-100 p-4 z-0">
        <div>
          <Search onSearch={handleSearch} />
        </div>
        <div className='flex justify-end px-4'>
          <Link href='/dashboard/new'>
            <button className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded">
              + CREATE NEW
            </button>
          </Link>
        </div>

        <div className='p-4 grid md:grid-cols-1 grid-cols-1'>
          <DashboardTable keyword={keyword} />
        </div>
      </main>
    </>

  )
}
