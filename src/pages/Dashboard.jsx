import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

function Dashboard() {
  const { user } = useAuth()

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome, {user.username}</h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Create quizzes, join live games, or manage the quizzes you already made.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <Link to="/quizzes" className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
            <h2 className="text-xl font-semibold">Browse Quizzes</h2>

            <p className="mt-2 leading-7 text-slate-600">
              Explore available public quizzes and find one to play.
            </p>

            <p className="mt-5 text-sm font-semibold text-indigo-600">
              View quizzes →
            </p>
          </Link>

          <Link to="/quizzes/my-quizzes" className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
            <h2 className="text-xl font-semibold">My Quizzes</h2>

            <p className="mt-2 leading-7 text-slate-600">
              View and manage the quizzes you have created.
            </p>

            <p className="mt-5 text-sm font-semibold text-indigo-600">
              Manage quizzes →
            </p>
          </Link>

          <Link to="/games/join" className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-300 hover:shadow-sm">
            <h2 className="text-xl font-semibold">Join a Game</h2>

            <p className="mt-2 leading-7 text-slate-600">
              Enter a game code and compete with other players live.
            </p>

            <p className="mt-5 text-sm font-semibold text-indigo-600">
              Join now →
            </p>
          </Link>

        </div>

      </div>
    </main>
  )
}

export default Dashboard