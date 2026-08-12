import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/button'

function Navbar() {

  const { logout, user } = useAuth()

  return (
    <nav className="border-b border-white/10 bg-slate-950 px-4 py-4 text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">

        <Link to="/" className="flex items-center">
          <h2 className="text-2xl font-black tracking-tight text-cyan-300"> Quizly </h2>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">

          <Link to="/quizzes" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4">
            All Quizzes
          </Link>

          {user && (
            <Link to="/quizzes/my-quizzes" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4">
              My Quizzes
            </Link>
          )}

          {user ? (
            <Button onClick={logout} className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 font-bold text-red-300 transition hover:bg-red-400/20!">
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/sign-in" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-4">
                Sign In
              </Link>

              <Link to="/sign-up" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-cyan-300">
                Sign Up
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar