import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import OAuth from '../components/OAuth';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }

            setLoading(false);
            setError(null);
            navigate('/sign-in');
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
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
                    value={inputs.username}
                    onChange={(e) =>
                        setInputs((inputs) => ({
                            ...inputs,
                            username: e.target.value.trim(),
                        }))
                    }
                />
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    id="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={(e) =>
                        setInputs((inputs) => ({
                            ...inputs,
                            email: e.target.value.trim(),
                        }))
                    }
                />
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="border p-3 rounded-lg w-full"
                        id="password"
                        placeholder="Password"
                        value={inputs.password}
                        onChange={(e) =>
                            setInputs((inputs) => ({
                                ...inputs,
                                password: e.target.value.trim(),
                            }))
                        }
                    />
                    <button
                        className="absolute top-4 right-3"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword((showPassword) => !showPassword);
                        }}
                    >
                        {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                </div>
                <button
                    disabled={loading}
                    className="flex w-full justify-center bg-slate-700 text-white p-3 rounded-lg 
                            font-semibold uppercase hover:opacity-95 disabled:opacity-80"
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
                <OAuth />
            </form>

            <div className="flex gap-2 mt-5 ">
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className="text-blue-700">Sign In</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error} </p>}
        </div>
    );
}
