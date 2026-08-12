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
                Math.ceil(remainingMilliseconds / 1000), 0
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

    const answerStyles = [
        "bg-indigo-500 hover:bg-indigo-600",
        "bg-cyan-500 hover:bg-cyan-600",
        "bg-rose-500 hover:bg-rose-600",
        "bg-amber-500 hover:bg-amber-600"
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 text-white">
            <div className="mx-auto max-w-6xl">

                {game?.status === "Waiting" && (
                    <div className="flex min-h-[80vh] flex-col items-center justify-center">
                        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                            Game Lobby
                        </p>

                        <h1 className="text-center text-4xl font-black tracking-tight sm:text-5xl">
                            Get ready to play
                        </h1>

                        <p className="mt-3 text-center text-slate-300">
                            Waiting for the host to start the game
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

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {players.map((player) => (
                                    <div
                                        key={player._id}
                                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/15"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-indigo-500 text-lg font-black text-white">
                                            {player.username.charAt(0).toUpperCase()}
                                        </div>

                                        <p className="truncate font-bold">
                                            {player.username}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {players.length === 0 && (
                                <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center text-slate-400">
                                    No players have joined yet
                                </div>
                            )}
                        </div>

                        <div className="mt-10 flex items-center gap-3 rounded-full bg-white/5 px-5 py-3 text-sm text-slate-300">
                            <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></span>
                            Waiting for host...
                        </div>
                    </div>
                )}

                {game?.status === "Active" && currentQuestion && (
                    <div className="flex min-h-[80vh] flex-col justify-center">

                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur-md">
                                Question {currentQuestion.currentQuestionIndex + 1} of {currentQuestion.totalQuestions}
                            </div>

                            <div
                                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-2xl font-black shadow-xl transition-all ${timeLeft <= 5
                                    ? "border-red-400 bg-red-500/20 text-red-300"
                                    : "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                    }`}
                            >
                                {timeLeft}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/10 px-6 py-10 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-14">
                            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">
                                Choose the correct answer
                            </p>

                            <h1 className="text-3xl font-black leading-tight sm:text-5xl">
                                {currentQuestion.text}
                            </h1>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">

                            {currentQuestion.choices.map((choice, index) => {
                                const answerClasses = [
                                    "from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500",
                                    "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
                                    "from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500",
                                    "from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400"
                                ]

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(choice)}
                                        disabled={hasAnswered || submitting || timeLeft <= 0}
                                        className={`
                                        min-h-28 rounded-3xl
                                        bg-linear-to-br
                                        px-6 py-6
                                        text-lg font-black text-white
                                        shadow-xl
                                        transition-all duration-200
                                        hover:-translate-y-1
                                        hover:scale-[1.01]
                                        hover:shadow-2xl
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                        disabled:hover:translate-y-0
                                        disabled:hover:scale-100
                                        ${answerClasses[index % answerClasses.length]}
                                    `}
                                    >
                                        <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/15 text-sm">
                                            {String.fromCharCode(65 + index)}
                                        </span>

                                        {choice}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="mt-7 text-center">

                            {answerError && (
                                <div className="mx-auto max-w-lg rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 font-semibold text-red-300">
                                    {answerError}
                                </div>
                            )}

                            {submitting && (
                                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-slate-300 backdrop-blur-md">
                                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400"></span>
                                    Submitting answer...
                                </div>
                            )}

                            {hasAnswered && (
                                <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 font-bold text-emerald-300">
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 text-sm text-slate-950">
                                        ✓
                                    </span>

                                    Answer submitted. Waiting for other players...
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {game?.status === "Results" && questionResult && (
                    <div className="flex min-h-[80vh] items-center justify-center">
                        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">

                            {selectedAnswer ? (
                                selectedAnswer === questionResult.correctAnswer ? (
                                    <>
                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-emerald-400 bg-emerald-400/15 text-5xl font-black text-emerald-300 shadow-lg">
                                            ✓
                                        </div>

                                        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
                                            Nice work
                                        </p>

                                        <h1 className="mt-2 text-5xl font-black text-white">
                                            Correct!
                                        </h1>
                                    </>
                                ) : (
                                    <>
                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-400 bg-red-400/15 text-5xl font-black text-red-300 shadow-lg">
                                            ✕
                                        </div>

                                        <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-red-300">
                                            Not quite
                                        </p>

                                        <h1 className="mt-2 text-5xl font-black text-white">
                                            Incorrect
                                        </h1>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-400/15 text-4xl font-black text-amber-300 shadow-lg">
                                        0
                                    </div>

                                    <h1 className="mt-6 text-4xl font-black">
                                        Time's Up!
                                    </h1>

                                    <p className="mt-2 text-slate-400">
                                        You did not submit an answer in time.
                                    </p>
                                </>
                            )}

                            {selectedAnswer && (
                                <div className="mt-8 rounded-2xl bg-black/15 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                                        Your Answer
                                    </p>

                                    <p className="mt-2 text-xl font-black">
                                        {selectedAnswer}
                                    </p>
                                </div>
                            )}

                            <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                                <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                                    Correct Answer
                                </p>

                                <p className="mt-2 text-2xl font-black text-white">
                                    {questionResult.correctAnswer}
                                </p>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-slate-400">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-cyan-400"></span>
                                Next question starting soon...
                            </div>
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
                                {error || "The host cancelled this game."}
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

export default ParticipantGamePage