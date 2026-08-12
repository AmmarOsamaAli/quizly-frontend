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

    return (
        <div>
            <h1>Game</h1>

            {game?.status === "Waiting" && (
                <>
                    <h2>Game Code: {game.code}</h2>
                    <p>Waiting for the host to start...</p>

                    <h3>Players Joined: {players.length}</h3>
                    <ul>
                        {players.map((player) => (
                            <li key={player._id}>
                                {player.username}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {game?.status === "Active" && currentQuestion && (
                <>
                    <h2>Question {currentQuestion.currentQuestionIndex + 1}{" "} Of {" "}{currentQuestion.totalQuestions}</h2>

                    <h3>Time Left: {timeLeft}s</h3>

                    <h2>{currentQuestion.text}</h2>

                    <div>
                        {currentQuestion.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => { handleAnswer(choice) }}
                                disabled={hasAnswered || submitting || timeLeft <= 0}
                            >
                                {choice}
                            </button>
                        ))}

                        {answerError && (
                            <p className='error'>{answerError}</p>
                        )}

                        {hasAnswered && (
                            <p>Answer Submitted. Waiting for other players...</p>
                        )}

                        {submitting && (
                            <p>Submitting  Answer...</p>
                        )}

                    </div>
                </>
            )

            }

            {game?.status === "Results" && questionResult && (

                <>
                    <h2>Question Results</h2>

                    {selectedAnswer ? (
                        <>
                            <p>Your Answer: {selectedAnswer}</p>

                            {selectedAnswer === questionResult.correctAnswer ? (
                                <p>Correct!</p>
                            ) : (
                                <p>Incorrect!</p>
                            )}

                        </>
                    ) : (
                        <p>You Did not Answer in time</p>
                    )}

                    <p>Correct Answer: {questionResult.correctAnswer}</p>

                    <p>Next question starting soon...</p>

                </>
            )}

            {game?.status === "Cancelled" && (
                <div>
                    <h2>Game Cancelled</h2>
                    <p>{error || "The host cancelled this game."}</p>
                </div>
            )}

        </div>
    )
}

export default ParticipantGamePage