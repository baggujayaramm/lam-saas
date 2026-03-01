export default function SystemAdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-foreground">System Administration</h1>
                <p className="text-neutral-500 mt-1">Global platform metrics and organization management.</p>
            </div>

            {/* System Admin content mapping... */}
            <div className="bg-card border border-border rounded-2xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">System Control Center</h2>
                <p className="text-neutral-500 max-w-md mx-auto">
                    This dashboard provides global root access to all organizations, users, and server settings.
                    In Phase 1, this is a placeholder.
                </p>
            </div>
        </div>
    )
}
