'use client'

import { useState, useContext } from "react";
import DraggableResizableContainer from "../DraggableResizableGridContainer"
import Form from "@/components/Form";
import { GlobalContext } from "@/context/globalContext";

export default function CreateDashboard() {
    const [showDialog, setShowDialog] = useState(false)

    const [isSaved, setIsSaved] = useState(false)
    const { dashboard } = useContext(GlobalContext)



    return (
        <div className="bg-white h-screen">
            <div className="mx-4">
                <div className="w-full flex py-4">
                    <h1 className="font-bold ">
                        {isSaved ? `Dashboard: ${dashboard.dName} ` : 'Dashboard'}
                    </h1>
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
                    <div>
                        <button
                            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-2  hover:border-transparent rounded"
                            onClick={() => setShowDialog(!showDialog)}
                        >
                            SAVE LAYOUT
                        </button>
                    </div>
                    {showDialog && <Form setShowDialog={setShowDialog} setIsSaved={setIsSaved} />}

                </div>
                {/* <------------end of top div---------------> */}
            </div>
            <div className={showDialog ? `blurredBg mx-4` : 'mx-4'}>
                <DraggableResizableContainer isSaved={isSaved} />
            </div>



        </div>

    )
}