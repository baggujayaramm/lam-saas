"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Users, BookOpen, Settings, LayoutDashboard, LogOut, Loader2 } from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await fetch("/api/auth/logout", { method: "POST" })
            router.push("/login")
        } catch (e) {
            setIsLoggingOut(false)
        }
    }

    const navItems = [
        { label: "Overview", icon: LayoutDashboard, href: "/dashboard/org-admin" },
        { label: "Courses", icon: BookOpen, href: "/dashboard/org-admin/courses" },
        { label: "Cohorts", icon: Users, href: "/dashboard/org-admin/cohorts" },
        { label: "Settings", icon: Settings, href: "/dashboard/org-admin/settings" },
    ]

    // Extremely basic Sidebar + Topnav layout for Phase 1
    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="font-bold text-lg text-primary">Cohort Platform</span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-neutral-400"}`} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        {isLoggingOut ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5 text-neutral-400" />}
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="md:hidden font-bold text-primary">Cohort Platform</div>
                    <div className="hidden md:flex flex-1"></div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                            AD
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
