import React, { FC } from "react"
import Container from "../../../components/Container"
import { BsGraphUpArrow, BsGraphDownArrow } from 'react-icons/bs'

type props = {
    data: {
        heading: string,
        profit: string,
        total: string,
        orders: string
    }
}

const Cards: FC<props> = ({ data }): JSX.Element => {

    return (
        <div className="flex w-full">
            <Container>
                <div className="flex flex-col px-4 w-64">
                    <div className="flex justify-between ">
                        <h1 className="font-bold text-sm">{data.heading}</h1>
                        <h1>...</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className=" w-32">
                            <h1 className="font-bold">${data.total}</h1>
                            <div className="flex justify-between items-center pt-2">
                                <p className="text-xs text-gray-500 w-full">{data.orders} orders</p>
                                {data.heading === 'earning' ? (
                                    <div className="bg-green-100 rounded-md h-4 flex justify-center w-full">
                                        <p className="text-xs text-green-700">{data.profit}%</p>
                                    </div>
                                ) : (
                                    <div className="bg-red-100 rounded-md h-4 flex justify-center w-full">
                                        <p className="text-xs text-red-700">{data.profit}%</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        <div className=' p-4'>
                            {data.heading === 'earning' ? (
                                <BsGraphUpArrow className='text-blue-900' size='50px' color="#0f7661" />
                            ) : (
                                <BsGraphDownArrow className='text-blue-900' size='50px' color="#fa6969" />
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cards