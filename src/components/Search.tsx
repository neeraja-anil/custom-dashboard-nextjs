'use client'
import React, { FC, useState, ChangeEvent } from 'react'
import { IoMdSearch } from 'react-icons/io'


interface searchComponentProps {
    onSearch: (query: string) => void;
}

const Search: FC<searchComponentProps> = ({ onSearch }) => {
    const [keyword, setKeyword] = useState('')


    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setKeyword(query)
        onSearch(query)
    }
    return (
        <div>
            <div className="mb-3">
                <div className="relative w-full mb-4 p-4 flex flex-wrap justify-between">
                    <input
                        type="search"
                        className="bg-white w-full h-12 px-5 pl-4 rounded-full text-sm focus:outline-none bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none shadow-md transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1"
                        value={keyword}
                        onChange={handleSearch}
                    />

                    {/* <!--Search button--> */}
                    <div className='absolute right-0 pr-4 mt-3 mr-4'>
                        <IoMdSearch />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search