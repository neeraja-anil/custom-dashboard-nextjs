'use client'

import { useState, useContext, useRef } from "react";
import DraggableResizableContainer from "../DraggableResizableGridContainer"
import Form from "@/components/Form";
import { GlobalContext } from "@/context/globalContext";
import html2canvas from 'html2canvas'


export default function CreateDashboard() {
    const [showDialog, setShowDialog] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const { dashboard } = useContext(GlobalContext)

    const comRef = useRef(null)

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

    return (
        <div className="bg-white h-screen" id="screenshot" >
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
                                <div className="p-2 text-sm ">Bar chart</div>
                                <div className="p-2 text-sm ">Pie chart</div>
                                <div className="p-2 text-sm ">Campaign</div>
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
                    {showDialog && <Form setShowDialog={setShowDialog} setIsSaved={setIsSaved} handleScreenshot={handleScreenshot} />}

                </div>
                {/* <------------end of top div---------------> */}
            </div>
            <div className={showDialog ? `blurredBg mx-4` : 'mx-4'} ref={comRef}>
                <DraggableResizableContainer isSaved={isSaved} />
            </div>



        </div>

    )
}