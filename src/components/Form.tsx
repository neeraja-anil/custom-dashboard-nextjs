import { GlobalContext } from '@/context/globalContext'
import React, { FC, useState, useContext } from 'react'

type props = {
    setShowDialog: any
}

const Form: FC<props> = ({ setShowDialog }) => {
    const [dName, setDName] = useState('')
    const { layout } = useContext(GlobalContext)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const date = Date.now()
        const id = `layout_${date}`;
        const layoutData = { id, dName, layout, date }
        const storedLayoutData = JSON.parse(localStorage.getItem("layoutData") || "[]");
        storedLayoutData.push(layoutData)
        localStorage.setItem('layoutData', JSON.stringify(storedLayoutData));
        alert('data saved')
        setShowDialog(false)
    }

    return (
        <div className='dialog'>
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
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
            </form>

        </div>
    )
}

export default Form