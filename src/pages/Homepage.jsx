import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Homepage() {
  const { user } = useAuth()

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 text-slate-900">

      <section className="mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 py-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">

          <div>
            <p className="text-sm font-semibold text-indigo-600">Live multiplayer quizzes</p>

            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Create quizzes.
              <br />
              Play together.
              <br />
              Compete live.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Create quizzes, challenge your friends, and compete in live games where faster answers earn more points.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {user ? (
                <>
                  <Link to="/games/join" className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                    Join a Game
                  </Link>

                  <Link to="/quizzes" className="rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                    Browse Quizzes
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/sign-up" className="rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
                    Get Started
                  </Link>

                  <Link to="/sign-in" className="rounded-md border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Question 3 of 10</span>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-indigo-600 font-bold text-indigo-600">
                  14
                </div>
              </div>

              <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 px-5 py-8 text-center">
                <p className="text-sm font-medium text-slate-500">Choose your answer</p>

                <h2 className="mt-3 text-2xl font-bold">
                  What is the capital of Bahrain?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-center font-semibold">Manama</div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-center font-semibold">Riffa</div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-center font-semibold">Muharraq</div>
                <div className="rounded-lg border border-slate-200 bg-white p-5 text-center font-semibold">Isa Town</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">

          <div className="text-center">
            <p className="text-sm font-semibold text-indigo-600">How it works</p>

            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Play together in seconds
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 font-bold text-indigo-600">1</div>

              <h3 className="mt-5 text-xl font-semibold">Pick a Quiz</h3>

              <p className="mt-2 leading-7 text-slate-600">
                Browse public quizzes or create one of your own.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 font-bold text-indigo-600">2</div>

              <h3 className="mt-5 text-xl font-semibold">Share the Code</h3>

              <p className="mt-2 leading-7 text-slate-600">
                Players join the live lobby using a six-digit game code.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 font-bold text-indigo-600">3</div>

              <h3 className="mt-5 text-xl font-semibold">Compete Live</h3>

              <p className="mt-2 leading-7 text-slate-600">
                Answer quickly, earn points, and climb the leaderboard.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Homepage