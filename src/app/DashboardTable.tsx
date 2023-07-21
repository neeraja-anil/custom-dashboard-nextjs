import React from 'react'
import { dashboardData } from '@/data/dashboardData'
import { LuLayoutDashboard } from 'react-icons/lu'
import Link from 'next/link'

const DashboardTable = () => {
    return (
        <div>
            <div className='w-full col-span-1  realtive lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll scroll'>
                <ul>
                    {dashboardData.map((data, id) => (
                        <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg px-3 my-3 flex justify-between items-center cursor-pointer'>
                            <div className='flex justify-between items-center'>
                                <div className='bg-blue-200 rounded p-4'>
                                    <LuLayoutDashboard className='text-blue-900 ' />
                                </div>
                                <div className='pl-4'>
                                    <p className='text-blue-900 font-bold'>{data.name}</p>
                                </div>

                            </div>
                            <div className='flex relative justify-between items-center'>
                                <p className='text-blue-200 p-3 text-sm'>{data.date}</p>
                                <Link href='/dashboard/:id' >
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm p-3 px-4 rounded lg:flex sm:hidden'>View</button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default DashboardTable