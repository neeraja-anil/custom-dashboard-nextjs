'use client'
import React, { FC, useContext } from "react";
import GridLayout from "react-grid-layout";
import BarChart from "./new/BarChart";
import PieChart from "./new/PieChart";
import DiscountCard from "./new/DiscountCard";
import StaticCardsContainer from "./new/StaticCardsContainer";
import { GlobalContext } from "@/context/globalContext";

//props for viewing or changing layout after saving
type props = {
    isSaved?: boolean
    savedDashboard?: []
    isEdit?: boolean
}

const DraggableResizableChart: FC<props> = ({ savedDashboard, isEdit, isSaved }): JSX.Element => {
    const { layout: curLayout, setLayout } = useContext(GlobalContext)
    const edit = isEdit && !!savedDashboard
    console.log('edit', edit)

    const layout = savedDashboard ? savedDashboard : [
        { i: "static", x: 0, y: 0, w: 6.5, h: 1.5, static: true },
        { i: "bar", x: 0, y: 1.5, w: 4, h: 2, minH: 2, minW: 4 },
        { i: "pie", x: 7, y: 0, w: 3, h: 2, minH: 2, minW: 2 },
        { i: "discount", x: 4, y: 1.5, w: 3, h: 1.5, minH: 1.5, minW: 3 },
    ];

    const onLayoutChange = (newLayout: any) => {
        setLayout(newLayout)
    };

    return (
        <div>
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                rowHeight={100}
                width={1100}

                onLayoutChange={onLayoutChange}
                draggableHandle=".drag-handle"
                isResizable={isSaved ? false : edit ? true : savedDashboard ? false : true}
            >
                <div key="static" className="chart-item ">
                    <StaticCardsContainer />
                </div>
                {/* BarChart Component wrapped in a resizable and draggable item */}
                <div key="bar" className="chart-item " >
                    <BarChart class={edit ? 'drag-handle' : savedDashboard ? '' : 'drag-handle'} />
                </div>
                {/* PieChart Component wrapped in a resizable and draggable item */}
                <div key="pie" className="chart-item" data-grid={{ w: 4, h: 4 }}>
                    <PieChart class={edit ? 'drag-handle' : savedDashboard ? '' : 'drag-handle'} />
                </div>
                {/* Discount Component wrapped in a resizable and draggable item */}
                <div key="discount" className="chart-item" data-grid={{ w: 4, h: 4 }}>
                    <DiscountCard class={edit ? 'drag-handle' : savedDashboard ? '' : 'drag-handle'} />
                </div>
            </GridLayout>
        </div>
    );
};

export default DraggableResizableChart;
