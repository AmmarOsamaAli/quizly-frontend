import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children }) {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
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