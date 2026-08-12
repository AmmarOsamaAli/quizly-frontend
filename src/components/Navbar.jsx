import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Button } from './ui/button'

function Navbar() {
  const { logout, user} = useAuth()
  return (
    <nav className='border-b text-white flex items-center justify-center bg-accent-foreground border-gray-300 p-5'>
     <div className='w-[78%] flex flex-row justify-between'>
       <div>
        <h2 className='text-white text-2xl font-medium'>Quizly</h2>
      </div>
     <div className='flex items-center gap-3'>
       {user 
      ? 
      (<>
      <Button onClick={logout} className='bg-red-400 hover:bg-red-400! rounded-lg text-white p-2'>Sign Out</Button>
      </>) : 
      (<>
        <Link to='/sign-up'>Sign Up</Link>
        <Link to='/sign-in'>Sign In</Link>
      </>)}
      <Link to='/quizzes'>All Quizzes</Link>
      <Link to='/quizzes/my-quizzes'>My Quizzes</Link>
     </div>
     </div>
    </nav>
  )
}

export default Navbar