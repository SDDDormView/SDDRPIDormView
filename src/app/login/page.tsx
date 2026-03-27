"use client"

import { useState } from "react"

export default function Home() {
    const [showCreate, setShowCreate] = useState<'login' | 'create' | 'forgot'>('login')

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-500">
            {/* REPLACE BG WITH PROPER BACKGROUND glass effect on bg*/}
            {/* https://nysmusic.com/2024/12/16/metallica-1989-concert-at-rpi-field-house-revisited-on-troy-story-podcast/ */}
            <div className="w-full max-w-md px-4">
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">

                    {/* LOGIN CARD */}
                    {showCreate === 'login' && (
                        <div>
                            <h2 className="text-xl font-medium mb-6">Log In</h2>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Username</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Username" />
                            </div>

                            <div className="block mb-6">
                                <p className="text-sm text-gray-500">Password</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Password" />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3">Log In</button>

                            {/* SWAP TO CREATE ACCOUNT */}
                            <section className="flex items-center justify-between">
                                <div className="text-left">
                                    <button onClick={() => setShowCreate('create')} className="text-sm underline text-gray-500">Create Account</button>
                                </div>
                                <div className="text-right">
                                    <button onClick={() => setShowCreate('forgot')} className="text-sm underline text-gray-500">Forgot Password?</button>
                                </div>
                            </section>
                            
                        </div>
                    )}

                    {/* CREATE ACCOUNT CARD */}
                    {showCreate === 'create' && (
                        <div>
                            <h2 className="text-xl font-medium mb-6">Create account</h2>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Email</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Student@email.com" />
                            </div>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Username</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Username" />
                            </div>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Password</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Password" />
                            </div>

                            <div className="block mb-6">
                                <p className="text-sm text-gray-500">Password again</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Confirm Password" />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3">Create Account</button>

                            {/* SWAP TO LOG IN */}
                            <div className="text-center">
                                <button onClick={() => setShowCreate('login')} className="text-sm underline text-gray-500">Back to Log In</button>
                            </div>
                            
                        </div>
                    )}

                    {showCreate === 'forgot' && (
                        <div>
                            <h2 className="text-xl font-medium mb-6">Forgot Password</h2>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Email</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Email" />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3">Reset Password</button>

                            {/* SWAP TO CREATE OR LOG IN */}
                            <section className="flex items-center justify-between">
                                <div className="text-left">
                                    <button onClick={() => setShowCreate('create')} className="text-sm underline text-gray-500">Create Account</button>
                                </div>
                                <div className="text-right">
                                    <button onClick={() => setShowCreate('login')} className="text-sm underline text-gray-500">Back to Log In</button>
                                </div>
                            </section>
                            
                        </div>
                    )}

                </div>
            </div>
        </main>
    )
}