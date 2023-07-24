'use client'
import React, { FC, useContext, useEffect, useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu'
import Link from 'next/link'
import { GlobalContext } from '@/context/globalContext'


const DashboardTable = () => {
    const [dashboards, setDashboards] = useState([])

    const deleteDashboard = (id: string) => {
        const date = Date.now()
        let storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]")

        // DELETE CURRENT DATA IN LOCAL STORAGE 
        const index = storedLayoutData.findIndex((data: any) => data.id === id);
        if (index !== -1) {
            // Remove the item from the array
            storedLayoutData.splice(index, 1);
        }

        // Update the modified array back to localStorage
        localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
        alert('data deleted')
    }

    useEffect(() => {
        const storedLayouts = localStorage.getItem('layoutData')
        const layouts = storedLayouts ? JSON.parse(storedLayouts) : [];
        setDashboards(layouts)
    }, [deleteDashboard])

    return (
        <div>
            <div className='w-full col-span-1  realtive lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll scroll'>
                <ul>
                    {dashboards.map((data: any) => (
                        <li key={data.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg px-3 my-3 flex justify-between items-center cursor-pointer'>
                            <div className='flex justify-between items-center'>
                                <div className='bg-blue-200 rounded p-4'>
                                    <LuLayoutDashboard className='text-blue-900 ' />
                                </div>
                                <div className='pl-4'>
                                    <p className='text-blue-900 font-bold'>{data.dName}</p>
                                </div>

                            </div>
                            <div className='flex relative justify-between items-center'>
                                <p className='text-blue-200 p-3 text-sm'>{data.date}</p>
                                <Link href={`/dashboard/${data.id}`} >
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white text-sm p-3 px-4 rounded lg:flex sm:hidden'>View</button>
                                </Link>
                                <button
                                    className='bg-blue-500 hover:bg-blue-700 text-white text-sm p-3 px-4 rounded lg:flex sm:hidden'
                                    onClick={() => deleteDashboard(data.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default DashboardTable