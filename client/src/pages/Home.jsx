import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <div className="max-w-6xl mx-auto py-28 px-3">
                <div className="flex flex-col gap-6">
                    <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
                        Find your next{' '}
                        <span className="text-slate-500">perfect</span> <br />
                        place with ease
                    </h1>
                    <div className="text-gray-400 text-xs sm:text-sm">
                        Sahand Estate will help you find your home fast, easy
                        and comfortable. <br />
                        Our expert support are always available.
                    </div>
                    <Link
                        to={'/search'}
                        className="text-xs sm:text-sm text-blue-800 font-bold hover:underline max-w-28"
                    >
                        Let's Start now...
                    </Link>
                </div>
            </div>
        </div>
    );
}
