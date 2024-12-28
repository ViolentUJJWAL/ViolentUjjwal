import { ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authServices } from '../services/authServices';
import { useAuth } from '../Context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const {login} = useAuth()
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');

    const verifyPassword = async (e) => {
        e.preventDefault();
        try {
            await authServices.sendOtp(password)
            setError('');
            setStep(2);
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        try {
            await authServices.verifyOtp(otp)
            await login()
            setError('');
            navigate("/admin-dashboard");
        } catch (error) {
            console.log(error)
            setError(error?.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-500 flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded shadow-md">
                <div className="flex items-center mb-6">
                    <ArrowLeft className="w-8 h-8 cursor-pointer" onClick={() => navigate("/home")} />
                    <h2 className="text-2xl font-bold ml-4">Login</h2>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={verifyPassword} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Verify Password
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyOtp} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Verify OTP
                        </button>
                        <div onClick={() => {
                            setPassword('')
                            setOtp('')
                            setError("")
                            setStep(1)
                        }}>resend otp</div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
