import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getGameById, submitAnswer } from '../../services/gameService'
import socket from '../../services/socket'

function ParticipantGamePage() {
    const [game, setGame] = useState(null)
    const [players, setPlayers] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [answerError, setAnswerError] = useState("")
    const [questionResult, setQuestionResult] = useState(null)
    const [timeLeft, setTimeLeft] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { gameId } = useParams()
    const navigate = useNavigate()

    async function handleAnswer(choice) {
        if (hasAnswered || submitting) {
            return
        }

        setAnswerError("")
        setSubmitting(true)
        setSelectedAnswer(choice)

        try {
            await submitAnswer(gameId, { selectedAnswer: choice })
            setHasAnswered(true)
        } catch (error) {
            setSelectedAnswer(null)
            setAnswerError(error.response?.data?.message || "Could not submit answer")
        } finally {
            setSubmitting(false)
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
            setSelectedAnswer(null)
            setHasAnswered(false)
            setSubmitting(false)
            setAnswerError("")
            setQuestionResult(null)

            setGame((previousGame) => ({
                ...previousGame,
                status: "Active"
            }))
        }

        function handleQuestionResult(results) {
            setQuestionResult(results)
            setTimeLeft(0)

            if (results.selectedAnswer !== undefined) {
                setSelectedAnswer(results.selectedAnswer)
            }

            setGame((previousGame) => ({
                ...previousGame,
                status: "Results"
            }))
        }

        function handleGameFinished() {
            navigate(`/games/${gameId}/results`)
        }

        function handleGameCanceled(data) {
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
        socket.on("gameCancelled", handleGameCanceled)

        socket.emit("joinGameRoom", gameId)

        return () => {
            socket.off("lobbyPlayers", handleLobbyPlayers)
            socket.off("gameRoomError", handleGameRoomError)
            socket.off("questionStarted", handleQuestionStarted)
            socket.off("questionResults", handleQuestionResult)
            socket.off("gameFinished", handleGameFinished)
            socket.off("gameCancelled", handleGameCanceled)
        }
    }, [gameId, navigate])

    useEffect(() => {
        async function loadGame() {
            try {
                const response = await getGameById(gameId)
                setGame(response)
            } catch (error) {
                setError(error.response?.data?.message)
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
                        <h1 className="text-center text-4xl font-bold sm:text-5xl">Get ready to play</h1>

                        <p className="mt-3 text-center text-slate-500">
                            Waiting for the host to start the game.
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

                            {players.length === 0 && (
                                <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
                                    No players have joined yet.
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
                            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                            Waiting for host...
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
                            <p className="text-sm font-medium text-slate-500">
                                Choose the correct answer
                            </p>

                            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
                                {currentQuestion.text}
                            </h1>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {currentQuestion.choices.map((choice, index) => (
                                <button key={index} onClick={() => handleAnswer(choice)} disabled={hasAnswered || submitting || timeLeft <= 0} className="min-h-24 rounded-lg border border-slate-300 bg-white px-6 py-5 text-lg font-semibold text-slate-800 transition hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:bg-white">
                                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">
                                        {String.fromCharCode(65 + index)}
                                    </span>

                                    {choice}
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 text-center">
                            {answerError && (
                                <div className="mx-auto max-w-lg rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                                    {answerError}
                                </div>
                            )}

                            {submitting && (
                                <div className="inline-flex items-center gap-3 text-sm text-slate-500">
                                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                                    Submitting answer...
                                </div>
                            )}

                            {hasAnswered && (
                                <div className="inline-flex items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                                    ✓ Answer submitted. Waiting for other players...
                                </div>
                            )}
                        </div>

                    </div>
                )}

                {game?.status === "Results" && questionResult && (
                    <div className="flex min-h-[75vh] items-center justify-center">
                        <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">

                            {selectedAnswer ? (
                                selectedAnswer === questionResult.correctAnswer ? (
                                    <>
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl font-bold text-emerald-700">
                                            ✓
                                        </div>

                                        <h1 className="mt-5 text-4xl font-bold text-emerald-700">
                                            Correct
                                        </h1>
                                    </>
                                ) : (
                                    <>
                                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl font-bold text-red-700">
                                            ✕
                                        </div>

                                        <h1 className="mt-5 text-4xl font-bold text-red-700">
                                            Incorrect
                                        </h1>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-xl font-bold text-amber-700">
                                        0
                                    </div>

                                    <h1 className="mt-5 text-4xl font-bold">
                                        Time&apos;s Up
                                    </h1>

                                    <p className="mt-2 text-slate-500">
                                        You did not submit an answer in time.
                                    </p>
                                </>
                            )}

                            {selectedAnswer && (
                                <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
                                    <p className="text-sm font-medium text-slate-500">Your Answer</p>

                                    <p className="mt-2 text-xl font-semibold">
                                        {selectedAnswer}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                                <p className="text-sm font-medium text-emerald-700">Correct Answer</p>

                                <p className="mt-2 text-xl font-semibold text-emerald-800">
                                    {questionResult.correctAnswer}
                                </p>
                            </div>

                            <div className="mt-7 flex items-center justify-center gap-3 text-sm text-slate-500">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                                Next question starting soon...
                            </div>

                        </div>
                    </div>
                )}

                {game?.status === "Cancelled" && (
                    <div className="flex min-h-[75vh] items-center justify-center">
                        <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-700">
                                ✕
                            </div>

                            <h1 className="mt-5 text-3xl font-bold">
                                Game Cancelled
                            </h1>

                            <p className="mt-3 text-slate-500">
                                {error || "The host cancelled this game."}
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

export default ParticipantGamePage