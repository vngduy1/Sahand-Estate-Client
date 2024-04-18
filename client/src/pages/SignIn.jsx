import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    signInStart,
    signInSuccess,
    signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

export default function SignIn() {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Submit form Sign In
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch('/api/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            const data = await res.json();

            if (data.success === false) {
                return dispatch(signInFailure(data.message));
            }

            dispatch(signInSuccess(data));

            navigate('/');
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>

            <form
                className="flex flex-col gap-4 relative"
                onSubmit={handleSubmit}
            >
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
                                password: e.target.value.trimStart(),
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
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>

            <div className="flex gap-2 mt-5 ">
                <p>Don't have a account?</p>
                <Link to="/sign-up">
                    <span className="text-blue-700">Sign Up</span>
                </Link>
            </div>
            {error && <p className="text-red-500 mt-5">{error} </p>}
        </div>
    );
}
