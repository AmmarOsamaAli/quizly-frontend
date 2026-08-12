import { useState } from 'react'
import { useNavigate } from 'react-router'
import { joinGame } from '../../services/gameService'


function JoinGamePage() {

    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
    }

    function handleChange(event) {
        setCode(event.target.value);
        setError("")

        if (!/^\d{6}$/.test(code)) {
            return setError("Game code must be exactly 6 digits")
        }

        try {
            const response = await joinGame(code)
            navigate(`/games/${response.gameId}/play`)
        } catch (error) {
            setError(error.response?.data?.message || "Could not join game")
        }

    }

    return (
        <div>
            <h1>Join Game</h1>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="code">Enter Game Code:</label>
                <input type="text" name="code" id="code" onChange={handleChange} value={code} maxLength={6} inputMode='numeric' />

                <button>Join Game</button>
            </form>
        </div>
    )
}

export default JoinGamePage