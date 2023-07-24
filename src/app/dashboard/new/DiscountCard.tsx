import React, { FC } from "react"
import Container from "./Container"
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs'

type props = {
    class: string
}
const DiscountCard: FC<props> = (props) => {

    return (
        <div className={`flex w-full `}>
            <div className={`${props.class} w-full md:col-span-1 relative md:h-fit h-full m-auto p-4 border rounded-lg bg-white`}>
                <div className="flex flex-col px-4 w-full">
                    <div className="flex justify-between ">
                        <h1 className="font-bold text-sm">Discount Campaign</h1>
                        <h1>...</h1>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <h1 className="font-bold w-full">20.4529</h1>
                        <div className="bg-green-100 rounded-md h-4 flex justify-center w-full">
                            <p className="text-xs text-green-700">+12.34%</p>
                        </div>
                    </div>

                    <div className="w-full bg-blue-200 rounded-full h-1.5 dark:bg-blue-200 mt-3">
                        <div className="w-2/5 bg-blue-700 h-1.5 rounded-full"></div>
                    </div>
                    <div className="pt-4">
                        <ul className="list-disc list-inside text-xs font-bold">
                            <li className="marker:text-blue-900">Listing Views</li>
                            <li className="marker:text-blue-700">Listing Engagements</li>
                            <li className="marker:text-blue-400">Listing Segment</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DiscountCard