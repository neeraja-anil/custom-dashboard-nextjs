'use-client'
import { GlobalContext } from '@/context/globalContext'
import React, { FC, useState, useContext } from 'react'
import { toast } from 'react-hot-toast'


type props = {
    id: string,
    dName: string,
    setShowDialog: any,
    setIsEdit: any,
    handleScreenshot: any,
}

const EditDashboardForm: FC<props> = ({ id, dName, setShowDialog, setIsEdit, handleScreenshot }) => {
    const [newDashboardName, setNewDashboardName] = useState(dName)
    const { layout } = useContext(GlobalContext)


    const handleEdit = async (e: any) => {
        e.preventDefault()
        const date = Date.now()
        let storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]");
        // call handleScreenshot fn when dashboard is saved 
        const previewData = await handleScreenshot()
        // UPDATE CURRENT DATA IN LOCAL STORAGE 
        storedLayoutData = storedLayoutData.map((data: any) => {
            if (data.id === id) {
                return {
                    ...data,
                    dName: newDashboardName || data.dName,
                    layout: layout,
                    preview: previewData,
                    updatedTime: date
                }
            }
            return data
        })
        console.log(storedLayoutData)
        localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
        toast.success('data updated')
        //SETTING ISEDIT,SHOWDIALOG PROPS FROM [ID]>PAGE TO FALSE 
        setIsEdit(false)
        setShowDialog(false)
    }

    return (
        <div className='dialog shadow-sm'>
            <form onSubmit={handleEdit}>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit Dashboard</label>
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
                <div className='flex justify-between md:flex-col'>
                    <button
                        type="button"
                        className="text-blue-700 border border-blue-700 hover:bg-blue-200 font-medium rounded-lg text-sm w-full sm:w-auto mx-1 py-2.5 text-center "
                        onClick={() => setShowDialog(false)}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto mx-1 py-2.5 text-center">Save</button>

                </div>
            </form>

        </div>
    )
}

export default EditDashboardForm
