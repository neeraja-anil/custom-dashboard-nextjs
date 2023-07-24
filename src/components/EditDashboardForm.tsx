import { GlobalContext } from '@/context/globalContext'
import React, { FC, useState, useContext } from 'react'

type props = {
    id: string,
    dName: string,
    setShowDialog: any
}

const EditDashboardForm: FC<props> = ({ id, dName, setShowDialog }) => {
    const [newDashboardName, setNewDashboardName] = useState(dName)

    const handleEdit = async (e: any) => {
        e.preventDefault()
        const date = Date.now()
        let storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]");
        // UPDATE CURRENT DATA IN LOCAL STORAGE 
        storedLayoutData = storedLayoutData.map((data: any) => {
            if (data.id === id) {
                return {
                    ...data,
                    dName: newDashboardName || data.dName,
                    updatedTime: date
                }
            }
            return data
        })
        console.log(storedLayoutData)
        localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
        alert('data updated')
        setShowDialog(false)
    }

    return (
        <div className='dialog'>
            <form onSubmit={handleEdit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Dashboard</label>
                    <input
                        type="text"
                        id="dname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name"
                        required
                        value={newDashboardName}
                        onChange={(e) => setNewDashboardName(e.target.value)}
                        disabled={false}
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>

        </div>
    )
}

export default EditDashboardForm
