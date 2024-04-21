import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
    return (
        <div
            className="bg-white shadow-md hover:shadow-lg
        transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]"
        >
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={
                        listing.imageUrls[0] ||
                        'data:image/jpeg;base64,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'
                    }
                    alt={listing.name}
                    className="h-[320px] sm:h-[220px] w-full object-cover
                    hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">
                        {listing.name}
                    </p>

                    <div className="flex items-center gap-1 ">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-500 truncate w-full">
                            {listing.address}{' '}
                        </p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-3 ">
                        {listing.description}{' '}
                    </p>

                    <p className="text-slate-500 mt-2 font-semibold ">
                        $
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <div className="text-slate-700 flex gap-4">
                        <div className="font-bold text-xs">
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} beds `
                                : `${listing.bedrooms} bed `}
                        </div>
                        <div className="font-bold text-xs">
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} baths `
                                : `${listing.bathrooms} bath `}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
