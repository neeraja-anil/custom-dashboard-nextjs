import React, { FC } from "react"
import Cards from "./Cards"

const CardsContainer: FC = () => {
    const cardData = [
        {
            heading: 'earning',
            profit: '12.6',
            total: '19.8767',
            orders: '150'
        },
        {
            heading: 'spending',
            profit: '-8.4',
            total: '10.8499',
            orders: '120'
        },
    ]
    return (
        <div className="flex m-3 w-full">
            <div className="flex justify-between md:flex-col">
                {cardData.map(item => (
                    <Cards data={item} />
                ))}
            </div>
        </div>
    )
}
export default CardsContainer