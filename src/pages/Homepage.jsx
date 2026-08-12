import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Homepage() {
  const { user } = useAuth()

  return (
    <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">

      {/* Hero */}
      <section className="mx-auto flex min-h-[75vh] max-w-6xl items-center px-4 py-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-2">

          <div>
            <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
              Live multiplayer quizzes
            </div>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Quiz.
              <br />
              Compete.
              <br />
              <span className="text-cyan-300">
                Win.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Create quizzes, challenge your friends, and compete in fast-paced
              live games where every second counts.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              {user ? (
                <>
                  <Link
                    to="/games/join"
                    className="rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-300"
                  >
                    Join a Game
                  </Link>

                  <Link
                    to="/quizzes"
                    className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    Browse Quizzes
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-300"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/sign-in"
                    className="rounded-2xl border border-white/15 bg-white/10 px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-white/15"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Game preview */}
          <div className="relative hidden lg:block">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-indigo-400/20 blur-3xl" />

            <div className="relative rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-cyan-300">
                  Question 3 of 10
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-cyan-400 text-lg font-black text-cyan-300">
                  14
                </div>
              </div>

              <div className="my-7 rounded-2xl bg-black/15 px-5 py-8 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Choose your answer
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  What is the capital of Bahrain?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 p-5 text-center font-black">
                  Manama
                </div>

                <div className="rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 p-5 text-center font-black">
                  Riffa
                </div>

                <div className="rounded-2xl bg-linear-to-br from-rose-500 to-pink-600 p-5 text-center font-black">
                  Muharraq
                </div>

                <div className="rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 p-5 text-center font-black">
                  Isa Town
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature section */}
      <section className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-4 py-16">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Play together in seconds
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-black">
                1
              </div>

              <h3 className="mt-5 text-xl font-black">
                Pick a Quiz
              </h3>

              <p className="mt-2 leading-7 text-slate-400">
                Browse public quizzes or create one of your own.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-xl font-black text-slate-950">
                2
              </div>

              <h3 className="mt-5 text-xl font-black">
                Share the Code
              </h3>

              <p className="mt-2 leading-7 text-slate-400">
                Players join the live lobby using a simple six-digit game code.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-xl font-black">
                3
              </div>

              <h3 className="mt-5 text-xl font-black">
                Compete Live
              </h3>

              <p className="mt-2 leading-7 text-slate-400">
                Answer quickly, earn more points, and climb the leaderboard.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default Homepage