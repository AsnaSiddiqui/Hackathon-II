'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import authService from '../../../services/auth';



const SignupPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!agreedToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Combine first and last name for the name field
      const fullName = `${firstName} ${lastName}`;

      // Attempt to register using the auth service
      const result = await authService.register(fullName, email, password);

      // Registration successful - show success message
      setError(null);
      setSuccess('Registration successful! Redirecting...');

      // Reset form after successful registration
      setFirstName('');
      setLastName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAgreedToTerms(false);

      // Redirect to home page immediately after success
      window.location.href = '/';

    } catch (err: any) {
      setError(err.message || 'Registration failed. Email might already be taken. Please try again.');
      setSuccess(null);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-white p-0 m-0">
      <div className="w-full flex flex-col justify-center items-center h-auto rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] text-[1vw]">

        {/* Section - Form */}
        <div className="w-1/2 flex flex-col justify-center p-8 text-[1vw]">
          <h1 className="text-black font-semibold text-2xl mb-6 text-left">Sign Up</h1>

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

            {/* First Name Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="text"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

            {/* Username Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

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

            {/* Confirm Password Input */}
            <div className="flex items-center border border-black rounded p-1.5 text-[1vw]">
              <span className="text-black mr-2 text-[1em]"></span>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="border-none outline-none w-full text-[1em]"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-1 mt-2 text-[1em]">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={loading}
                className="text-[1em]"
              />
              <label htmlFor="terms" className="text-black text-[1em]">
                I agree to all terms
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white border-none rounded p-2.5 mt-4 cursor-pointer text-[1em]"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-4 text-[1em] text-black">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-black underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;