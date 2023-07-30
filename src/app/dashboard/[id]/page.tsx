'use client'
import React, { useState, useEffect, useRef } from "react";
import DraggableResizableContainer from "../DraggableResizableGridContainer"
import html2canvas from "html2canvas";
import EditDashboardForm from "@/components/EditDashboardForm";
import { useRouter } from 'next/navigation'
import { HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-hot-toast";
import Model from "@/components/Model";

export default function CreateDashboard({ params }: { params: { id: string } }) {
    const [showDialog, setShowDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [dashboard, setDashboard] = useState<{ [key: string]: any }>({})
    const [openModel, setOpenModel] = useState(false)
    const [dashboardId, setDashboardId] = useState('')

    const comRef = useRef(null)
    const { push } = useRouter()

    const fetchSavedDashboard = () => {
        const storedLayouts = localStorage.getItem('layoutData')
        const layouts = storedLayouts ? JSON.parse(storedLayouts) : [];
        const item = layouts.find((layout: { id: string; }) => layout.id === params.id)
        setDashboard(item)
    }

    const handleCancelEdit = () => {
        fetchSavedDashboard()
        setIsEdit(false)
    }

    //FUNCTION TO TAKE SCREENSHOT OF DASHBOARD
    const handleScreenshot = async () => {
        const component = comRef.current
        if (!component) {
            return
        }

        const canvas = await html2canvas(component)
        // Convert the canvas to a base64 data URL
        const image = canvas.toDataURL('image/png');
        // Send the screenshot and the filename to the server-side endpoint
        const res = await fetch('/api/screenshot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ screenshot: image }),
        });
        const data = await res.json()
        return data
    }


    //DELETE DASHBOARD

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
        push('/')
    }

    useEffect(() => {
        fetchSavedDashboard()
    }, [])

    return (
        <div className="bg-white h-screen">
            <div className="mx-4">
                {/* <----title----> */}
                <div className="w-full flex py-4">
                    <h1 className="font-bold ">Dashboard: {dashboard.dName}</h1>
                </div>
                {/* <-----------starting of top div----------------> */}
                <div className="flex justify-between w-full h-12">
                    <div className="flex bg-gray-200 rounded p-2">
                        <div className="flex justify-between items-center ">
                            <div className="flex">
                                <button
                                    className="bg-white hover:text-white py-1 px-4 hover:border-transparent rounded"
                                >
                                    Overview
                                </button>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-gray-300">
                                <div className="p-2 text-sm ">Bar chart</div>
                                <div className="p-2 text-sm ">Pie chart</div>
                                <div className="p-2 text-sm ">Campaign</div>
                            </div>

                        </div>
                    </div>
                    <div className="flex items-center">
                        {
                            isEdit &&
                            <div className="mx-1">
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded"
                                    onClick={() => setShowDialog(!showDialog)}
                                >
                                    SAVE LAYOUT
                                </button>
                            </div>
                        }
                        <div className="mx-1">
                            {isEdit ? (
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded"
                                    onClick={handleCancelEdit}
                                >
                                    CANCEL EDIT
                                </button>
                            ) : (
                                <button
                                    className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded"
                                    onClick={() => setIsEdit(!isEdit)}
                                >
                                    EDIT LAYOUT
                                </button>
                            )}

                        </div>
                        <div className='hover:bg-red-100 p-4 rounded cursor-pointer' onClick={() => handleDeleteDashboard(params.id)}>
                            <HiOutlineTrash className='text-red-900' />
                        </div>
                    </div>
                    {showDialog && <EditDashboardForm id={params.id} dName={dashboard.dName} setShowDialog={setShowDialog} setIsEdit={setIsEdit} handleScreenshot={handleScreenshot} />}

                </div>
                {/* <------------end of top div---------------> */}
            </div>
            <div className={showDialog ? `blurredBg mx-4` : 'mx-4'} ref={comRef}>
                <DraggableResizableContainer savedDashboard={dashboard.layout} isEdit={isEdit} />
            </div>
            <Model isOpen={openModel} onCancel={handleCancelDelete} onDelete={handleConfirmDelete} id={dashboardId} />
        </div>

    )
}