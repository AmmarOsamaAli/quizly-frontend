import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { user } = useAuth()

  return (
    <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Welcome, {user.username}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Create quizzes, join live games, or manage the quizzes you already made.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <Link
            to="/quizzes"
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-black">
              Q
            </div>

            <h2 className="mt-5 text-xl font-black">
              Browse Quizzes
            </h2>

            <p className="mt-2 text-slate-400">
              Explore available public quizzes and find one to play.
            </p>

            <p className="mt-5 font-bold text-cyan-300 transition group-hover:translate-x-1">
              View quizzes →
            </p>
          </Link>

          <Link
            to="/quizzes/my-quizzes"
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-xl font-black text-slate-950">
              M
            </div>

            <h2 className="mt-5 text-xl font-black">
              My Quizzes
            </h2>

            <p className="mt-2 text-slate-400">
              View and manage the quizzes you have created.
            </p>

            <p className="mt-5 font-bold text-cyan-300 transition group-hover:translate-x-1">
              Manage quizzes →
            </p>
          </Link>

          <Link
            to="/games/join"
            className="group rounded-3xl border border-white/10 bg-white/5 p-7 transition hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-xl font-black">
              ▶
            </div>

            <h2 className="mt-5 text-xl font-black">
              Join a Game
            </h2>

            <p className="mt-2 text-slate-400">
              Enter a game code and compete with other players live.
            </p>

            <p className="mt-5 font-bold text-cyan-300 transition group-hover:translate-x-1">
              Join now →
            </p>
          </Link>

        </div>

      </div>
    </main>
  )
}

export default Dashboard