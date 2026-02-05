'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import authService from '../../../services/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if user just registered
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const registered = urlParams.get('registered');
    if (registered) {
      setSuccess('Registration successful! Please log in with your credentials.');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Attempt to log in using the auth service
      await authService.login(email, password);

      // Redirect to dashboard after successful login
      window.location.href = '/';
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white p-0 m-0">
      <div className="w-full flex-col justify-center items-center h-auto flex rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] text-[1vw]">

        {/* Section - Form */}
        <div className="w-1/2 flex flex-col justify-center p-8 text-[1vw]">
          <h1 className="text-black font-semibold text-2xl mb-6 text-left">Sign In</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-[1vw]">
            {error && (
              <div className="text-red-500 mb-2">
                {error}
              </div>
            )}
            {success && (
              <div className="text-green-500 mb-2">
                {success}
              </div>
            )}

            {/* Email Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white border-none rounded p-2.5 mt-4 cursor-pointer text-[1em]"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-4 text-[1em] text-black">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-black underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;