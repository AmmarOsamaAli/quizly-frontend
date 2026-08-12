import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getGameById, startGame, cancelGame } from '../../services/gameService'
import socket from '../../services/socket'

function HostGamePage() {
    const [game, setGame] = useState(null)
    const [players, setPlayers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [questionResult, setQuestionResult] = useState(null)
    const [timeLeft, setTimeLeft] = useState(0)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [starting, setStarting] = useState(false)
    const [cancelling, setCancelling] = useState(false)

    const { gameId } = useParams()
    const navigate = useNavigate()

    async function handleStartGame() {
        if (starting) {
            return
        }

        setError("")
        setStarting(true)

        try {
            await startGame(gameId)
        } catch (error) {
            setError(error.response?.data?.message || "Could not start game")
        } finally {
            setStarting(false)
        }
    }

    async function handleCancelGame() {
        if (cancelling) {
            return
        }

        setError("")
        setCancelling(true)

        try {
            await cancelGame(gameId)

            setGame((previousGame) => ({
                ...previousGame,
                status: "Cancelled"
            }))
        } catch (error) {
            setError(error.response?.data?.message || "Could not cancel game")
        } finally {
            setCancelling(false)
        }
    }

    useEffect(() => {
        if (!currentQuestion) {
            return
        }

        function updateTimer() {
            const startedAt = new Date(currentQuestion.startedAt).getTime()

            const endTime = startedAt + currentQuestion.timeLimit * 1000

            const remainingMilliseconds = endTime - Date.now()

            const remainingSeconds = Math.max(
                Math.ceil(remainingMilliseconds / 1000),
                0
            )

            setTimeLeft(remainingSeconds)
        }

        updateTimer()

        const timer = setInterval(() => {
            updateTimer()
        }, 1000)

        return () => {
            clearInterval(timer)
        }

    }, [currentQuestion])

    useEffect(() => {
        function handleLobbyPlayers(lobbyPlayers) {
            setPlayers(lobbyPlayers)
        }

        function handleGameRoomError(error) {
            setError(error.message)
        }

        function handleQuestionStarted(question) {
            setCurrentQuestion(question)
            setQuestionResult(null)

            setGame((previousGame) => ({
                ...previousGame,
                status: "Active"
            }))

        }

        function handleQuestionResult(results) {
            setQuestionResult(results)
            setTimeLeft(0)

            setGame((previousGame) => ({
                ...previousGame,
                status: "Results"
            }))
        }

        function handleGameFinished() {
            navigate(`/games/${gameId}/results`)
        }

        function handleGameCancelled(data) {
            setGame((previousGame) => ({
                ...previousGame,
                status: "Cancelled"
            }))

            setError(data.message)
        }


        socket.on("lobbyPlayers", handleLobbyPlayers)
        socket.on("gameRoomError", handleGameRoomError)
        socket.on("questionStarted", handleQuestionStarted)
        socket.on("questionResults", handleQuestionResult)
        socket.on("gameFinished", handleGameFinished)
        socket.on("gameCancelled", handleGameCancelled)

        socket.emit("joinGameRoom", gameId)

        return () => {
            socket.off("lobbyPlayers", handleLobbyPlayers)
            socket.off("gameRoomError", handleGameRoomError)
            socket.off("questionStarted", handleQuestionStarted)
            socket.off("questionResults", handleQuestionResults)
            socket.off("gameFinished", handleGameFinished)
            socket.off("gameCancelled", handleGameCancelled)
        }
    }, [gameId, navigate])

    useEffect(() => {
        async function loadGame() {
            try {
                const response = await getGameById(gameId)
                setGame(response)
            } catch (error) {
                setError(error.response?.data?.message || "Could not load game")
            } finally {
                setLoading(false)
            }
        }

        loadGame()
    }, [gameId])

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 text-white">
            <div className="mx-auto max-w-6xl">

                {game?.status === "Waiting" && (
                    <div className="flex min-h-[80vh] flex-col items-center justify-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                            Host Lobby
                        </p>

                        <h1 className="text-center text-4xl font-black tracking-tight sm:text-5xl">
                            Ready to start?
                        </h1>

                        <p className="mt-3 text-center text-slate-300">
                            Share the game code and wait for players to join
                        </p>

                        <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 px-10 py-7 text-center shadow-2xl backdrop-blur-xl">
                            <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">
                                Game Code
                            </p>

                            <p className="mt-2 text-5xl font-black tracking-[0.18em] text-cyan-300 sm:text-6xl">
                                {game.code}
                            </p>
                        </div>

                        <div className="mt-10 w-full max-w-4xl">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-2xl font-black">
                                    Players
                                </h2>

                                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                                    {players.length} joined
                                </span>
                            </div>

                            {players.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {players.map((player) => (
                                        <div
                                            key={player._id}
                                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15"
                                        >
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 text-lg font-black">
                                                {player.username.charAt(0).toUpperCase()}
                                            </div>

                                            <p className="truncate font-bold">
                                                {player.username}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-slate-400">
                                    Waiting for players to join...
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-3 font-semibold text-red-300">
                                {error}
                            </div>
                        )}

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <button
                                onClick={handleStartGame}
                                disabled={starting || players.length === 0}
                                className="rounded-2xl bg-cyan-400 px-8 py-4 text-lg font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                            >
                                {starting ? "Starting..." : "Start Game"}
                            </button>

                            <button
                                onClick={handleCancelGame}
                                disabled={cancelling}
                                className="rounded-2xl border border-red-400/30 bg-red-400/10 px-8 py-4 text-lg font-bold text-red-300 transition hover:-translate-y-1 hover:bg-red-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>
                        </div>
                    </div>
                )}

                {game?.status === "Active" && currentQuestion && (
                    <div className="flex min-h-[80vh] flex-col justify-center">
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur-md">
                                Question {currentQuestion.currentQuestionIndex + 1} of {currentQuestion.totalQuestions}
                            </span>

                            <div
                                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-2xl font-black shadow-xl ${timeLeft <= 5
                                        ? "border-red-400 bg-red-500/20 text-red-300"
                                        : "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                    }`}
                            >
                                {timeLeft}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-12">
                            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
                                Current Question
                            </p>

                            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                                {currentQuestion.text}
                            </h1>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {currentQuestion.choices.map((choice, index) => {
                                const choiceStyles = [
                                    "from-indigo-500 to-violet-600",
                                    "from-cyan-500 to-blue-600",
                                    "from-rose-500 to-pink-600",
                                    "from-amber-400 to-orange-500"
                                ]

                                return (
                                    <div
                                        key={index}
                                        className={`min-h-24 rounded-3xl bg-linear-to-br ${choiceStyles[index % choiceStyles.length]} flex items-center justify-center px-6 py-6 text-center text-lg font-black shadow-xl`}
                                    >
                                        <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-sm">
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        {choice}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-8 flex items-center justify-center gap-3 text-slate-300">
                            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></span>
                            Waiting for players to answer...
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={handleCancelGame}
                                disabled={cancelling}
                                className="rounded-xl border border-red-400/30 bg-red-400/10 px-6 py-3 font-bold text-red-300 transition hover:bg-red-400/20 disabled:opacity-40"
                            >
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>
                        </div>
                    </div>
                )}

                {game?.status === "Results" && questionResult && (
                    <div className="flex min-h-[80vh] items-center justify-center">
                        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-emerald-400 bg-emerald-400/15 text-4xl text-emerald-300">
                                ✓
                            </div>

                            <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                                Question Complete
                            </p>

                            <h1 className="mt-2 text-4xl font-black">
                                Correct Answer
                            </h1>

                            <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                                <p className="text-2xl font-black">
                                    {questionResult.correctAnswer}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-3 text-slate-400">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400"></span>
                                Next question starting soon...
                            </div>

                            <button
                                onClick={handleCancelGame}
                                disabled={cancelling}
                                className="mt-8 rounded-xl border border-red-400/30 bg-red-400/10 px-6 py-3 font-bold text-red-300 transition hover:bg-red-400/20 disabled:opacity-40"
                            >
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>
                        </div>
                    </div>
                )}

                {game?.status === "Cancelled" && (
                    <div className="flex min-h-[80vh] items-center justify-center">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-400/10 text-4xl text-red-300">
                                ✕
                            </div>

                            <h1 className="mt-6 text-4xl font-black">
                                Game Cancelled
                            </h1>

                            <p className="mt-3 text-slate-400">
                                {error || "This game has been cancelled."}
                            </p>

                            <button
                                onClick={() => navigate("/")}
                                className="mt-8 rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                                Return Home
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default HostGamePage