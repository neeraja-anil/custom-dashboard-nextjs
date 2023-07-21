'use client'

import Container from "./Container"

export default function CreateDashboard() {
    return (
        <div className="flex w-full h-12 m-3">
            <div className="flex bg-gray-200 rounded p-2">
                <div className="flex justify-between items-center ">
                    <div className="flex">
                        <button className="bg-white hover:text-white py-1 px-2  hover:border-transparent rounded">
                            Over View
                        </button>
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-gray-300">
                        <div className="p-2 text-sm hover:cursor-pointer ">Bar chart</div>
                        <div className="p-2 text-sm hover:cursor-pointer ">Pie chart</div>
                    </div>

                </div>
            </div>
        </div>
    )
}