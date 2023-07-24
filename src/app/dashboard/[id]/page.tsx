'use client'
import React, { useState, useEffect } from "react";
import DraggableResizableContainer from "../DraggableResizableGridContainer"
import Form from "@/components/Form";
import EditDashboardForm from "@/components/EditDashboardForm";

export default function CreateDashboard({ params }: { params: { id: string } }) {
    const [showDialog, setShowDialog] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [dashboard, setDashboard] = useState<{ [key: string]: any }>({})

    useEffect(() => {
        const storedLayouts = localStorage.getItem('layoutData')
        const layouts = storedLayouts ? JSON.parse(storedLayouts) : [];
        const item = layouts.find((layout: { id: string; }) => layout.id === params.id)
        setDashboard(item)
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
                                <div className="p-2 text-sm hover:cursor-pointer ">Bar chart</div>
                                <div className="p-2 text-sm hover:cursor-pointer ">Pie chart</div>
                                <div className="p-2 text-sm hover:cursor-pointer ">Campaign</div>
                            </div>

                        </div>
                    </div>
                    <div className="flex">
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
                            <button
                                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded"
                                onClick={() => setIsEdit(!isEdit)}
                            >
                                {!isEdit ? 'EDIT LAYOUT' : 'CANCEL EDIT'}
                            </button>
                        </div>

                    </div>
                    {showDialog && <EditDashboardForm id={params.id} dName={dashboard.dName} setShowDialog={setShowDialog} />}

                </div>
                {/* <------------end of top div---------------> */}
            </div>
            <div className="mx-4">
                <DraggableResizableContainer savedDashboard={dashboard.layout} isEdit={isEdit} />
            </div>



        </div>

    )
}