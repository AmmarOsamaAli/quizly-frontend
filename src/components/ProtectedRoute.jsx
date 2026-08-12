import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }) {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-slate-300 backdrop-blur-xl">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                        Loading...
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return children
}

export default ProtectedRoute