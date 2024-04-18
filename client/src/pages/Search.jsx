import React from 'react';

export default function Search() {
    return (
        <div className="flex flex-col md:flex-row">
            <div
                className="bg-transparent border-b-2 sm:border-r-2 
            p-7 h-auto md:min-h-screen flex-2"
            >
                <form className="flex flex-col gap-8">
                    {/* Search */}
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">
                            Search Term:
                        </label>
                        <input
                            type="text"
                            id="searchTern"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <label className="whitespace-nowrap">Type: </label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                checked
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="rent" className="w-5" />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="sale" className="w-5" />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="offer" className="w-5" />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Amenities</label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap">Sort:</label>
                        <select
                            id="sort-order"
                            className="border rounded-lg p-3"
                        >
                            <option value="regularPrice_desc">
                                Price high to low
                            </option>
                            <option value="regularPrice_asc">
                                Price high to hight
                            </option>
                            <option value="createdAt_desc" selected>
                                Latest
                            </option>
                            <option value="createdAt_asc" selected>
                                Oldest
                            </option>
                        </select>

                        <button className="bg-slate-700 text-white p-3 uppercase rounded-lg w-full">
                            Search
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl m-5 font-semibold border-b p-3 text-slate-700">
                    Listing result:
                </h1>
                <div className="flex flex-wrap gap-4 p-7">
                    <li className="bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border h-[330px]">
                        This Image
                    </li>
                    <li className="bg-white flex flex-col gap-4 shadow-md hover:shadow-lg rounded-md overflow-hidden transition-shadow w-full sm:w-[330px] border h-[330px]">
                        This Image
                    </li>
                </div>
            </div>
        </div>
    );
}
