import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/button'

function Navbar() {
  const { logout, user } = useAuth()

  return (
    <nav className="border-b border-slate-200 bg-white px-4 py-4">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">

        <Link to="/" className="flex items-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quizly</h2>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">

          <Link to="/quizzes" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
            All Quizzes
          </Link>

          {user && (
            <>
              <Link to="/quizzes/my-quizzes" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                My Quizzes
              </Link>

              <Link to="/quizzes/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
                Create Quiz
              </Link>
            </>
          )}

          {user ? (
            <Button onClick={logout} variant="ghost" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900">
              Sign Out
            </Button>
          ) : (
            <>
              <Link to="/sign-in" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                Sign In
              </Link>

              <Link to="/sign-up" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700">
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