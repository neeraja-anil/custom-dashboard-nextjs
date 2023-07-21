'use client'

import CardsContainer from "./CardsContainer"
import Container from "./Container"

export default function CreateDashboard() {
    return (
        <div className="bg-white h-screen">
            <div className="mx-4">
                <div className="w-full flex py-4">
                    <h1 className="font-bold ">Dashboard</h1>
                </div>
                {/* <-----------starting of div----------------> */}
                <div className="flex w-full h-12">
                    <div className="flex bg-gray-200 rounded p-2">
                        <div className="flex justify-between items-center ">
                            <div className="flex">
                                <button className="bg-white hover:text-white py-1 px-4 hover:border-transparent rounded">
                                    Overview
                                </button>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-gray-300">
                                <div className="p-2 text-sm hover:cursor-pointer ">Bar chart</div>
                                <div className="p-2 text-sm hover:cursor-pointer ">Pie chart</div>
                                <div className="p-2 text-sm hover:cursor-pointer ">Table</div>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <------------end of div---------------> */}
            </div>
            <div>
                <CardsContainer />
            </div>

        </div>

    )
}