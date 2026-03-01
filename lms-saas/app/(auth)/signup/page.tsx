"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
    const router = useRouter()
    const [organizationName, setOrganizationName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ organizationName, email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Signup failed")
            }

            // Org admin redirect
            router.push("/dashboard/org-admin")
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900 tracking-tight">
                    Create your organization
                </h2>
                <p className="mt-2 text-center text-sm text-neutral-600">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow-sm border border-border sm:rounded-2xl sm:px-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent px-2 py-1 rounded-full border border-accent/20">
                            30-Day Trial
                        </div>
                    </div>
                    <form className="space-y-6 mt-4" onSubmit={handleSignup}>
                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Organization Name</label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    required
                                    value={organizationName}
                                    onChange={(e) => setOrganizationName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Acme Academy"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Admin Email</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="admin@acme.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-700">Password</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-border rounded-lg shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Minimum 8 characters"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm font-medium border border-red-200 bg-red-50 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <div>
                            <p className="text-xs text-neutral-500 mb-4 text-center">
                                By creating an account, you agree to our Terms of Service and Privacy Policy.
                            </p>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Setting up..." : "Create Organization"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
