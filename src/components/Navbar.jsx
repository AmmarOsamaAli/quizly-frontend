import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav>
      {user 
      ? 
      (<>
      <button onClick={logout}>Sign Out</button>
      </>) : 
      (<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
      <Link to='/quizzes'>All Quizzes</Link>
    </nav>
  )
}

export default Navbar