"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
)

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [done, setDone] = useState(false)

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="p-10 text-center">
        Password updated! You can now log in.
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded">
        <h1 className="text-xl mb-4">Set New Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleUpdate} className="w-full border py-2">
          Update Password
        </button>
      </div>
    </div>
  )
}