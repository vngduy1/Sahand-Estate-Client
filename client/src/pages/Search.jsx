import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                const data = await res.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchListings();
        // debounced = useDebounce(fetchListings, 500);
    }, [location.search]);

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'all':
            case 'rent':
            case 'sale':
                setSidebardata({ ...sidebardata, type: e.target.id });
                break;

            case 'searchTerm':
                setSidebardata({ ...sidebardata, searchTerm: e.target.value });
                break;

            case 'parking':
            case 'furnished':
            case 'offer':
                setSidebardata({
                    ...sidebardata,
                    [e.target.id]: !!e.target.checked,
                });
                break;

            case 'sort_order':
                const sort = e.target.value.split('_')[0] || 'created_at';

                const order = e.target.value.split('_')[1] || 'desc';

                setSidebardata({ ...sidebardata, sort, order });
                break;

            default:
                console.log('cannot properties');
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div
                className="bg-transparent border-b-2 sm:border-r-2 
            p-7 h-auto md:min-h-screen flex-2"
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Search */}
                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Search Term:
                        </label>
                        <input
                            disabled={loading}
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <label className="whitespace-nowrap">Type: </label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'all'}
                            />

                            <span>Rent & Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'rent'}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === 'sale'}
                            />
                            <span>Sale</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex items-center flex-wrap gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Amenities
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            Sort:
                        </label>
                        <select
                            id="sort_order"
                            className="border rounded-lg p-3"
                            onChange={handleChange}
                            defaultValue={'create_at_desc'}
                        >
                            <option value="regularPrice_desc">
                                Price high to low
                            </option>
                            <option value="regularPrice_asc">
                                Price high to hight
                            </option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>

                        <button
                            disabled={loading}
                            className="bg-slate-700 text-white p-3 uppercase rounded-lg w-full
                        hover:opacity-95"
                        >
                            {loading ? 'Loading...' : 'Search'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl m-5 font-semibold border-b p-3 text-slate-700 mt-5">
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
