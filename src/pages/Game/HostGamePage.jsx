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
        <div>
            <h1>Host Game</h1>

            {game?.status === "Waiting" && (
                <>
                    <h2>Game Code: {game.code}</h2>

                    <h3>Players Joined: {players.length}</h3>

                    <ul>
                        {players.map((player) => (
                            <li key={player._id}>
                                {player.username}
                            </li>
                        ))}
                    </ul>

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    <button
                        onClick={handleStartGame}
                        disabled={starting || players.length === 0}
                    >
                        {starting ? "Starting..." : "Start Game"}
                    </button>

                    <button
                        onClick={handleCancelGame}
                        disabled={cancelling}
                    >
                        {cancelling ? "Cancelling..." : "Cancel Game"}
                    </button>
                </>
            )}

            {game?.status === "Active" && currentQuestion && (
                <>
                    <h2>
                        Question {currentQuestion.currentQuestionIndex + 1} of {currentQuestion.totalQuestions}
                    </h2>

                    <h3>Time Left: {timeLeft}s</h3>

                    <h2>{currentQuestion.text}</h2>

                    <ul>
                        {currentQuestion.choices.map((choice, index) => (
                            <li key={index}>
                                {choice}
                            </li>
                        ))}
                    </ul>

                    <p>Waiting for players to answer...</p>

                    <button
                        onClick={handleCancelGame}
                        disabled={cancelling}
                    >
                        {cancelling ? "Cancelling..." : "Cancel Game"}
                    </button>
                </>
            )}

            {game?.status === "Results" && questionResult && (
                <>
                    <h2>Question Results</h2>

                    <p>Correct Answer: {questionResult.correctAnswer}</p>

                    <p>Next question starting soon...</p>

                    <button
                        onClick={handleCancelGame}
                        disabled={cancelling}
                    >
                        {cancelling ? "Cancelling..." : "Cancel Game"}
                    </button>
                </>
            )}
            {game?.status === "Cancelled" && (
                <>
                    <h2>Game Cancelled</h2>
                    <p>{error || "This game has been cancelled."}</p>
                </>
            )}
        </div>
    )
}

export default HostGamePage