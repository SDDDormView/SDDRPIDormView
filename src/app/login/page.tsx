"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient( // Create a Supabase client instance for authentication and login
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export default function Home() {
    const [showCreate, setShowCreate] = useState<'login' | 'create' | 'forgot'>('login')

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    // Handle login
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        // Supabase handles errors
        if (error) alert(error.message)
        else alert("Logged in!")
    }

    // Handle signup
    const handleSignup = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })
        // Supabase handles errors
        if (error) {
            alert(error.message)
            return
        }
        // If no error, create profile with username and id and insert into profiles table
        if (data.user) {
            await supabase.from("profiles").insert({
                id: data.user.id,
                username,
            })
        }

        alert("Account created!")
    }

    // Handle password reset
    const handleReset = async () => {
        const { error } = await supabase.auth.resetPasswordForEmail(email)

        if (error) alert(error.message)
        else alert("Reset email sent")
    }

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
                                <p className="text-sm text-gray-500">Email</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="block mb-6">
                                <p className="text-sm text-gray-500">Password</p>
                                <input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3"
                                onClick={handleLogin}
                            >Log In</button>

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
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Student@email.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Username</p>
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="block mb-4">
                                <p className="text-sm text-gray-500">Password</p>
                                <input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="block mb-6">
                                <p className="text-sm text-gray-500">Password again</p>
                                <input type="password" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Confirm Password" />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3"
                                onClick={handleSignup}
                            >Create Account</button>

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
                                <input type="text" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400" placeholder="Enter Your Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <hr className="border-gray-200 my-4" />

                            <button className="w-full border border-gray-300 text-sm py-2 rounded-md mb-3"
                                onClick={handleReset}
                            >Reset Password</button>

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