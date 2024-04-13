import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        console.log('handleSUbmit');
        e.preventDefault();
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        console.log(data);
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="border p-3 rounded-lg"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="border p-3 rounded-lg"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button
                    className="flex w-full justify-center bg-slate-700 text-white p-3 rounded-lg 
                            font-semibold uppercase hover:opacity-95 disabled:opacity-80"
                >
                    Sign Up
                </button>
                <button
                    className="bg-red-700 text-white p-3 rounded-lg uppercase 
                hover:opacity-95"
                >
                    Continue with google
                </button>
            </form>

            <div className="flex gap-2 mt-5 ">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Sign In</span>
                </Link>
            </div>
        </div>
    );
}
