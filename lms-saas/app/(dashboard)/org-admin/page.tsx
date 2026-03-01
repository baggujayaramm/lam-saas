import { Users, BookOpen, Clock } from "lucide-react"

export default function OrgAdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Organization Overview</h1>
                <p className="text-neutral-500 mt-1">Manage your cohorts, instructors, and billing.</p>
            </div>

            {/* Metrics Row Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Active Students</p>
                        <h3 className="text-2xl font-bold mt-1">124</h3>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Active Cohorts</p>
                        <h3 className="text-2xl font-bold mt-1">4</h3>
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
                    <div className="h-12 w-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Trial Status</p>
                        <h3 className="text-2xl font-bold mt-1">29 Days Left</h3>
                    </div>
                </div>
            </div>

            {/* Main Sections Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-6 min-h-[300px]">
                    <h3 className="font-bold text-lg mb-4">Recent Enrollments</h3>
                    <div className="flex flex-col items-center justify-center h-48 text-neutral-400">
                        <Users className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">No enrollments yet.</p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 min-h-[300px]">
                    <h3 className="font-bold text-lg mb-4">Upcoming Sessions</h3>
                    <div className="flex flex-col items-center justify-center h-48 text-neutral-400">
                        <Clock className="w-8 h-8 mb-2 opacity-50" />
                        <p className="text-sm">No upcoming sessions.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
