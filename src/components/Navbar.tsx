import React from 'react'

const Navbar = () => {
    return (
        <div className='flex justify-end items-center p-4 bg-white sticky top-0 z-10'>
            {/* <div className=' hover:bg-blue-900 rounded-lg p-4 my-3 flex items-center cursor-pointer'>
                <h2 className='text-white text-bold'>DB</h2>
            </div> */}
            <h2 className='text-bold '>Welcome to Dashboard</h2>
        </div>
    )
}

export default Navbar