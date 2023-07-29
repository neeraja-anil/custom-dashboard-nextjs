'use client'

import { GlobalContext } from '@/context/globalContext'
import React, { FC, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'

type props = {
    setShowDialog: any
    setIsSaved: any
    handleScreenshot: any
}

const Form: FC<props> = ({ setShowDialog, setIsSaved, handleScreenshot }) => {
    const [dName, setDName] = useState('')
    const { layout } = useContext(GlobalContext)
    const { setDashboard } = useContext(GlobalContext)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const dateNow = Date.now()
        const date = new Date(dateNow).toISOString().substr(0, 10)
        const id = `layout_${dateNow}`;
        const layoutData = { id, dName, layout, date }
        const storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]");
        const isExist = storedLayoutData.filter((data: any) => data.dName === layoutData.dName)
        if (isExist.length === 0) {
            storedLayoutData.push(layoutData)
            localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
            toast.success('New dashboard created')
            setIsSaved(true)
            setDashboard(layoutData)
            // call fn only if the dashboard is saved 
            handleScreenshot()
            setShowDialog(false)
        } else {
            toast.error('dashboard with same name already exist, choose another name')
        }

    }

    return (
        <div className='dialog shadow-sm'>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Dashboard Name</label>
                    <input
                        type="text"
                        id="dname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name"
                        required
                        value={dName}
                        onChange={(e) => setDName(e.target.value)}
                    />
                </div>
                <div className='flex justify-between md:flex-col'>
                    <button
                        type="button"
                        className="text-blue-700 border border-blue-700 hover:bg-blue-200 font-medium rounded-lg text-sm w-full sm:w-auto mx-1 py-2.5 text-center "
                        onClick={() => setShowDialog(false)}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto mx-1 py-2.5 text-center ">Save</button>
                </div>
            </form>

        </div>
    )
}

export default Form