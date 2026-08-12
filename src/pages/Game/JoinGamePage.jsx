import { useState } from 'react'
import { useNavigate } from 'react-router'
import { joinGame } from '../../services/gameService'

function JoinGamePage() {
    const [code, setCode] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleChange(event) {
        setCode(event.target.value)
        setError("")
    }

    async function handleSubmit(event) {
        event.preventDefault()
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
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 text-slate-900">
            <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-4xl items-center justify-center">

                <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

                    <div className="text-center">
                        <h1 className="text-4xl font-bold">Join a Game</h1>

                        <p className="mt-3 text-slate-500">
                            Enter the 6-digit game code to join the lobby.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8">
                        <label htmlFor="code" className="mb-2 block text-sm font-medium text-slate-700">
                            Game Code
                        </label>

                        <input type="text" name="code" id="code" value={code} onChange={handleChange} maxLength={6} inputMode="numeric" placeholder="123456" className="w-full rounded-md border border-slate-300 bg-white px-5 py-4 text-center text-3xl font-semibold tracking-[0.25em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />

                        {error && (
                            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="mt-6 w-full rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700">
                            Join Game
                        </button>
                    </form>

                    <div className="mt-6 border-t border-slate-200 pt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Ask the host for the game code if you don&apos;t have one.
                        </p>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default JoinGamePage