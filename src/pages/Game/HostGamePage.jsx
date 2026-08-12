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
            socket.off("questionResults", handleQuestionResult)
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
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-8 text-slate-900">
            <div className="mx-auto max-w-6xl">

                {game?.status === "Waiting" && (
                    <div className="flex min-h-[75vh] flex-col items-center justify-center">
                        <h1 className="text-center text-4xl font-bold sm:text-5xl">Ready to start?</h1>

                        <p className="mt-3 text-center text-slate-500">
                            Share the game code and wait for players to join.
                        </p>

                        <div className="mt-10 rounded-xl border border-slate-200 bg-white px-10 py-7 text-center shadow-sm">
                            <p className="text-sm font-medium text-slate-500">Game Code</p>

                            <p className="mt-2 text-5xl font-bold tracking-[0.18em] text-indigo-600 sm:text-6xl">
                                {game.code}
                            </p>
                        </div>

                        <div className="mt-10 w-full max-w-4xl">
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold">Players</h2>

                                <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                                    {players.length} joined
                                </span>
                            </div>

                            {players.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {players.map((player) => (
                                        <div key={player._id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                                                {player.username.charAt(0).toUpperCase()}
                                            </div>

                                            <p className="truncate font-medium">
                                                {player.username}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                                    Waiting for players to join...
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <button onClick={handleStartGame} disabled={starting || players.length === 0} className="rounded-md bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">
                                {starting ? "Starting..." : "Start Game"}
                            </button>

                            <button onClick={handleCancelGame} disabled={cancelling} className="rounded-md border border-red-200 bg-white px-8 py-3 font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40">
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>
                        </div>
                    </div>
                )}

                {game?.status === "Active" && currentQuestion && (
                    <div className="flex min-h-[75vh] flex-col justify-center">

                        <div className="mb-6 flex items-center justify-between gap-4">
                            <span className="text-sm font-medium text-slate-500">
                                Question {currentQuestion.currentQuestionIndex + 1} of {currentQuestion.totalQuestions}
                            </span>

                            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 text-xl font-bold ${timeLeft <= 5 ? "border-red-500 text-red-600" : "border-indigo-600 text-indigo-600"}`}>
                                {timeLeft}
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm sm:px-12 sm:py-12">
                            <p className="text-sm font-medium text-slate-500">Current Question</p>

                            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
                                {currentQuestion.text}
                            </h1>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {currentQuestion.choices.map((choice, index) => (
                                <div key={index} className="flex min-h-24 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-5 text-center text-lg font-semibold text-slate-800">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    {choice}
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex items-center justify-center gap-3 text-sm text-slate-500">
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                            Waiting for players to answer...
                        </div>

                        <div className="mt-7 text-center">
                            <button onClick={handleCancelGame} disabled={cancelling} className="rounded-md border border-red-200 bg-white px-6 py-3 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40">
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>
                        </div>

                    </div>
                )}

                {game?.status === "Results" && questionResult && (
                    <div className="flex min-h-[75vh] items-center justify-center">
                        <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
                                ✓
                            </div>

                            <h1 className="mt-5 text-3xl font-bold">Correct Answer</h1>

                            <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                                <p className="text-xl font-semibold text-emerald-800">
                                    {questionResult.correctAnswer}
                                </p>
                            </div>

                            <div className="mt-7 flex items-center justify-center gap-3 text-sm text-slate-500">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                                Next question starting soon...
                            </div>

                            <button onClick={handleCancelGame} disabled={cancelling} className="mt-7 rounded-md border border-red-200 bg-white px-6 py-3 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-40">
                                {cancelling ? "Cancelling..." : "Cancel Game"}
                            </button>

                        </div>
                    </div>
                )}

                {game?.status === "Cancelled" && (
                    <div className="flex min-h-[75vh] items-center justify-center">
                        <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-700">
                                ✕
                            </div>

                            <h1 className="mt-5 text-3xl font-bold">Game Cancelled</h1>

                            <p className="mt-3 text-slate-500">
                                {error || "This game has been cancelled."}
                            </p>

                            <button onClick={() => navigate("/")} className="mt-7 rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                                Return Home
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}

export default HostGamePage