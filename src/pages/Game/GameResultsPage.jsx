import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getGameResults } from '../../services/gameService'

function GameResultsPage() {
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { gameId } = useParams()

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
        <div>
            <h1>Final Results</h1>

            <h2>Leaderboard</h2>

            {results.leaderboard.length === 0 ? (
                <p>No players found.</p>
            ) : (
                <ol>
                    {results.leaderboard.map((player) => (
                        <li key={player.user._id}>
                            <h3>
                                #{player.position} {player.user.username}
                            </h3>

                            <p>Score: {player.score}</p>
                            <p>Correct Answers: {player.correct}</p>
                            <p>Wrong Answers: {player.wrong}</p>
                        </li>
                    ))}
                </ol>
            )}
        </div>
    )
}

export default GameResultsPage
