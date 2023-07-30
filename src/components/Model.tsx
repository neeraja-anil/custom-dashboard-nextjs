import React, { FC, useState } from 'react'


type props = {
    isOpen: boolean
    onCancel: any
    onDelete: (id: string) => void
    id: string
}

const Model: FC<props> = ({ isOpen, id, onCancel, onDelete }) => {

    const handleDelete = () => {
        onDelete(id)
        onCancel()
    }
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg">
                <p className="text-lg font-semibold">Are you sure you want to delete?</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-4 px-4 py-2 border border-gray-400 rounded-lg" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Model