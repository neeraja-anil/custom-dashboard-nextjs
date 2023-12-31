'use client'
import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { LuLayoutDashboard } from 'react-icons/lu'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import Model from '@/components/Model'

type props = {
    keyword: string
}

const DashboardTable: FC<props> = ({ keyword }) => {
    const [dashboards, setDashboards] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [openModel, setOpenModel] = useState(false)
    const [dashboardId, setDashboardId] = useState('')

    const fetchDashboards = () => {
        const storedLayouts = localStorage.getItem('layoutData')
        const layouts = storedLayouts ? JSON.parse(storedLayouts) : [];
        setDashboards(layouts)
        setSearchResult(layouts)
    }

    const handleSearch = () => {
        if (keyword === '') {
            fetchDashboards()
        } else {
            const filterBySearch = dashboards.filter((data: any) =>
                data.dName.toLowerCase().includes(keyword.toLowerCase())
            )
            setSearchResult(filterBySearch)
        }
    }


    const handleDeleteDashboard = (id: string) => {
        setOpenModel(true)
        setDashboardId(id)
    }
    const handleCancelDelete = () => {
        setOpenModel(false)
    }
    const handleConfirmDelete = (id: string) => {
        let storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]")
        // DELETE CURRENT DATA IN LOCAL STORAGE 
        const index = storedLayoutData.findIndex((data: any) => data.id === id);
        if (index !== -1) {
            // Remove the item from the array
            storedLayoutData.splice(index, 1);
        }

        // Update the modified array back to localStorage
        localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
        toast.success('your dashboard deleted')
        //update the ui
        fetchDashboards()
        // }
    }

    useEffect(() => {
        fetchDashboards()
    }, [])

    useEffect(() => {
        handleSearch()
    }, [keyword])


    return (
        <div>
            <div className='w-full col-span-1  realtive md:h-[50vh] h-[60vh] m-auto p-4 border rounded-lg bg-white overflow-scroll scroll'>
                <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
                    <thead className="text-xs text-white uppercase bg-blue-600 dark:text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <LuLayoutDashboard className='text-white ' />
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dashboard name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* MAPPING THROUGH SAVED DASHBOARDS */}
                        {searchResult.map((data: any) => (
                            <tr key={data.id} className="bg-blue-50 border-b border-blue-200 hover:bg-blue-100">
                                <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    <Link href={`/dashboard/${data.id}`} >

                                        <Image
                                            src={data.preview}
                                            objectFit="contain"
                                            // layout='responsive'
                                            width={100}
                                            height={100}
                                            alt="Preview of dashboard"
                                            className='rounded-lg'
                                        />


                                    </Link>
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                    <p className='text-blue-900 font-bold'>{data.dName}</p>
                                </th>
                                <td className="px-6 py-4">
                                    <p className='text-blue-400 text-sm'>{data.date}</p>

                                </td>
                                <td className="px-6 ">
                                    <div className='flex justify-end items-center'>
                                        <Link href={`/dashboard/${data.id}`} >
                                            {/* <div className='hover:bg-blue-200 p-4'>
                                                <HiOutlineEye className='text-blue-500 hover:text-white' />
                                            </div> */}

                                        </Link>
                                        <div className='hover:bg-red-100 p-4 cursor-pointer' onClick={() => handleDeleteDashboard(data.id)}>
                                            <HiOutlineTrash className='text-red-900' />
                                        </div>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Model isOpen={openModel} onCancel={handleCancelDelete} onDelete={handleConfirmDelete} id={dashboardId} />
            </div>
        </div>

    )
}

export default DashboardTable