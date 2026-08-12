import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getGameResults } from '../../services/gameService'

function GameResultsPage() {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { gameId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadResults() {
            try {
                const response = await getGameResults(gameId)
                setResults(response)
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Could not load game results"
                )
            } finally {
                setLoading(false)
            }
        }

        loadResults()
    }, [gameId])

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                        Loading results...
                    </div>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-semibold text-red-700">Could not load results</h1>

                        <p className="mt-3 text-red-600">
                            {error}
                        </p>

                        <button onClick={() => navigate("/quizzes")} className="mt-6 rounded-md border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
                            Back to Quizzes
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    if (!results) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <p className="text-slate-500">No results found.</p>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-5xl">

                <div className="text-center">
                    <h1 className="text-4xl font-bold sm:text-5xl">Final Results</h1>

                    <p className="mt-3 text-slate-500">
                        Here is the final leaderboard.
                    </p>
                </div>

                {results.leaderboard.length > 0 && (
                    <div className="mt-12 grid items-end gap-4 md:grid-cols-3">

                        {results.leaderboard[1] && (
                            <div className="order-2 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm md:order-1">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-200 text-xl font-bold text-slate-700">
                                    2
                                </div>

                                <h2 className="mt-4 truncate text-xl font-semibold">
                                    {results.leaderboard[1].user.username}
                                </h2>

                                <p className="mt-2 text-2xl font-bold">
                                    {results.leaderboard[1].score}
                                </p>

                                <p className="text-sm text-slate-500">
                                    points
                                </p>
                            </div>
                        )}

                        {results.leaderboard[0] && (
                            <div className="order-1 rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm md:order-2 md:-translate-y-4">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-white">
                                    1
                                </div>

                                <p className="mt-4 text-sm font-semibold text-amber-700">
                                    Winner
                                </p>

                                <h2 className="mt-1 truncate text-2xl font-semibold">
                                    {results.leaderboard[0].user.username}
                                </h2>

                                <p className="mt-3 text-3xl font-bold">
                                    {results.leaderboard[0].score}
                                </p>

                                <p className="text-sm text-slate-500">
                                    points
                                </p>
                            </div>
                        )}

                        {results.leaderboard[2] && (
                            <div className="order-3 rounded-xl border border-orange-200 bg-white p-6 text-center shadow-sm">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-300 text-xl font-bold text-orange-900">
                                    3
                                </div>

                                <h2 className="mt-4 truncate text-xl font-semibold">
                                    {results.leaderboard[2].user.username}
                                </h2>

                                <p className="mt-2 text-2xl font-bold">
                                    {results.leaderboard[2].score}
                                </p>

                                <p className="text-sm text-slate-500">
                                    points
                                </p>
                            </div>
                        )}

                    </div>
                )}

                <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 px-6 py-5">
                        <h2 className="text-xl font-semibold">Leaderboard</h2>
                    </div>

                    {results.leaderboard.length === 0 ? (
                        <div className="p-10 text-center text-slate-500">
                            No players found.
                        </div>
                    ) : (
                        <div>
                            {results.leaderboard.map((player) => (
                                <div key={player.user._id} className="grid grid-cols-[50px_1fr_auto] items-center gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0">
                                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${player.position === 1
                                            ? "bg-amber-100 text-amber-700"
                                            : player.position === 2
                                                ? "bg-slate-200 text-slate-700"
                                                : player.position === 3
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-slate-100 text-slate-600"
                                        }`}>
                                        {player.position}
                                    </div>

                                    <div>
                                        <p className="font-medium">
                                            {player.user.username}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {player.correct} correct · {player.wrong} wrong
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xl font-semibold text-slate-900">
                                            {player.score}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            points
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-10 flex justify-center">
                    <button onClick={() => navigate("/quizzes")} className="rounded-md bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700">
                        Back to Quizzes
                    </button>
                </div>

            </div>
        </main>
    )
}

export default GameResultsPage