import Link from 'next/link'
import React, { ReactNode } from 'react'
import { IoMdCreate, IoMdSearch, IoIosPerson, IoIosBuild } from 'react-icons/io'



const SideBar = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex '>
            <div className='fixed w-40 sm:w-20 h-screen p-4 bg-blue-900 flex-col justify-between z-50'>
                <div className='flex items-center justify-center flex-col'>
                    <Link href={`/`}>
                        <div className='bg-blue-700 hover:bg-blue-900 rounded-lg p-4 flex items-center cursor-pointer'>
                            <h2 className='text-white text-bold'>DB</h2>
                        </div>
                    </Link>

                    {/* <h1 className='text-white origin-left '>Designer</h1> */}
                    <span className='border-b-[1px] border-gray-100 w-full p-2'></span>
                    <div className='flex justify-evenly items-center p-4 w-full hover:bg-blue-500'>
                        <IoMdCreate className='text-white' />
                        <p className='pl-3 text-white text-sm sm:hidden'>Create</p>
                    </div>
                    <div className='flex justify-evenly items-center p-4 w-full hover:bg-blue-500'>
                        <IoMdSearch className='text-white' />
                        <p className='pl-3 text-white text-sm sm:hidden'>Search</p>
                    </div>
                    <div className='flex justify-evenly items-center p-4 w-full hover:bg-blue-500'>
                        <IoIosPerson className='text-white' />
                        <p className='pl-3 text-white text-sm sm:hidden'>Profile</p>
                    </div>
                    <div className='flex justify-evenly items-center p-4 w-full hover:bg-blue-500'>
                        <IoIosBuild className='text-white' />
                        <p className='pl-3 text-white text-sm sm:hidden'>Settings</p>
                    </div>
                </div>
            </div>
            <main className='ml-40 sm:ml-20 w-full'>{children}</main>
        </div>
    )
}

export default SideBar