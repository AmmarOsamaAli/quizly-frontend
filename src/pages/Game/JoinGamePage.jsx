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

    async function handleChange(event) {
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
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-8 text-white">
            <div className="mx-auto flex min-h-[80vh] max-w-4xl items-center justify-center">

                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">

                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-300">
                            Quizly Live
                        </p>

                        <h1 className="mt-3 text-4xl font-black">
                            Join a Game
                        </h1>

                        <p className="mt-3 text-slate-400">
                            Enter the 6-digit game code to join the lobby.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >
                        <label
                            htmlFor="code"
                            className="mb-2 block text-sm font-bold text-slate-300"
                        >
                            Game Code
                        </label>

                        <input
                            type="text"
                            name="code"
                            id="code"
                            value={code}
                            onChange={handleChange}
                            maxLength={6}
                            inputMode="numeric"
                            placeholder="123456"
                            className="
                            w-full rounded-2xl
                            border border-white/10
                            bg-black/20
                            px-5 py-5
                            text-center text-3xl font-black
                            tracking-[0.25em]
                            text-white
                            outline-none
                            transition
                            placeholder:text-slate-600
                            focus:border-cyan-400
                            focus:ring-4
                            focus:ring-cyan-400/10
                        "
                        />

                        {error && (
                            <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-center font-semibold text-red-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="
                            mt-6 w-full
                            rounded-2xl
                            bg-cyan-400
                            px-6 py-4
                            text-lg font-black
                            text-slate-950
                            shadow-xl
                            transition
                            hover:-translate-y-1
                            hover:bg-cyan-300
                        "
                        >
                            Join Game
                        </button>
                    </form>

                    <div className="mt-6 border-t border-white/10 pt-6 text-center">
                        <p className="text-sm text-slate-500">
                            Ask the host for the game code if you don't have one.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default JoinGamePage