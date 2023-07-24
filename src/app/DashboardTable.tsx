'use client'
import React, { useEffect, useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import Link from 'next/link'


const DashboardTable = () => {
    const [dashboards, setDashboards] = useState([])

    const fetchDashboards = () => {
        const storedLayouts = localStorage.getItem('layoutData')
        const layouts = storedLayouts ? JSON.parse(storedLayouts) : [];
        setDashboards(layouts)
    }

    const deleteDashboard = (id: string) => {
        let storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]")

        const isConfirmed = window.confirm('Are you sure you want to delete?');
        if (isConfirmed) {
            // DELETE CURRENT DATA IN LOCAL STORAGE 
            const index = storedLayoutData.findIndex((data: any) => data.id === id);
            if (index !== -1) {
                // Remove the item from the array
                storedLayoutData.splice(index, 1);
            }

            // Update the modified array back to localStorage
            localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
            alert('data deleted')
            //update the ui
            fetchDashboards()
        }
    }

    useEffect(() => {
        fetchDashboards()
    }, [])

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
                                    <div className='hover:bg-blue-100 p-4'>
                                        <HiOutlineEye />
                                    </div>
                                </Link>
                                <div className='hover:bg-red-100 p-4' onClick={() => deleteDashboard(data.id)}>
                                    <HiOutlineTrash className='text-red-900' />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default DashboardTable