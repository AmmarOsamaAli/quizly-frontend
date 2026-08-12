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
        return <p>Loading results...</p>
    }

    if (error) {
        return <p className="error">{error}</p>
    }

    if (!results) {
        return <p>No results found.</p>
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 text-white">
            <div className="mx-auto max-w-5xl">

                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                        Game Complete
                    </p>

                    <h1 className="mt-3 text-4xl font-black sm:text-5xl">
                        Final Results
                    </h1>

                    <p className="mt-3 text-slate-400">
                        Great game. Here is the final leaderboard.
                    </p>
                </div>

                {results.leaderboard.length > 0 && (
                    <div className="mt-12 grid items-end gap-4 md:grid-cols-3">

                        {results.leaderboard[1] && (
                            <div className="order-2 rounded-3xl border border-white/10 bg-white/10 p-6 text-center shadow-xl backdrop-blur-xl md:order-1">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-300 text-2xl font-black text-slate-900">
                                    2
                                </div>

                                <h2 className="mt-4 truncate text-xl font-black">
                                    {results.leaderboard[1].user.username}
                                </h2>

                                <p className="mt-2 text-2xl font-black text-slate-200">
                                    {results.leaderboard[1].score}
                                </p>

                                <p className="text-sm text-slate-400">
                                    points
                                </p>
                            </div>
                        )}

                        {results.leaderboard[0] && (
                            <div className="order-1 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-8 text-center shadow-2xl backdrop-blur-xl md:order-2 md:-translate-y-6">
                                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-300 text-3xl font-black text-slate-950 shadow-lg">
                                    1
                                </div>

                                <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
                                    Winner
                                </p>

                                <h2 className="mt-2 truncate text-2xl font-black">
                                    {results.leaderboard[0].user.username}
                                </h2>

                                <p className="mt-3 text-3xl font-black text-amber-300">
                                    {results.leaderboard[0].score}
                                </p>

                                <p className="text-sm text-slate-400">
                                    points
                                </p>
                            </div>
                        )}

                        {results.leaderboard[2] && (
                            <div className="order-3 rounded-3xl border border-white/10 bg-white/10 p-6 text-center shadow-xl backdrop-blur-xl">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-400 text-2xl font-black text-slate-950">
                                    3
                                </div>

                                <h2 className="mt-4 truncate text-xl font-black">
                                    {results.leaderboard[2].user.username}
                                </h2>

                                <p className="mt-2 text-2xl font-black text-slate-200">
                                    {results.leaderboard[2].score}
                                </p>

                                <p className="text-sm text-slate-400">
                                    points
                                </p>
                            </div>
                        )}

                    </div>
                )}

                <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="border-b border-white/10 px-6 py-5">
                        <h2 className="text-xl font-black">
                            Leaderboard
                        </h2>
                    </div>

                    {results.leaderboard.length === 0 ? (
                        <div className="p-10 text-center text-slate-400">
                            No players found.
                        </div>
                    ) : (
                        <div>
                            {results.leaderboard.map((player) => (
                                <div
                                    key={player.user._id}
                                    className="grid grid-cols-[50px_1fr_auto] items-center gap-4 border-b border-white/10 px-6 py-5 last:border-b-0"
                                >
                                    <div
                                        className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${player.position === 1
                                                ? "bg-amber-300 text-slate-950"
                                                : player.position === 2
                                                    ? "bg-slate-300 text-slate-950"
                                                    : player.position === 3
                                                        ? "bg-orange-400 text-slate-950"
                                                        : "bg-white/10 text-white"
                                            }`}
                                    >
                                        {player.position}
                                    </div>

                                    <div>
                                        <p className="font-black">
                                            {player.user.username}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-400">
                                            {player.correct} correct · {player.wrong} wrong
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-xl font-black text-cyan-300">
                                            {player.score}
                                        </p>

                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            points
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={() => navigate("/quizzes")}
                        className="rounded-2xl bg-cyan-400 px-8 py-4 font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-300"
                    >
                        Back to Quizzes
                    </button>
                </div>

            </div>
        </div>
    )
}

export default GameResultsPage
