import React, { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quizServices'
import { Link } from 'react-router'
import QuizCard from '../../components/QuizCard'


function AllQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes(){
        try{
            const response = await getAllQuizzes()
            setQuiz(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        loadQuizzes()
    }, [])

  return (
    <div>
        <h1>All Quizzes</h1>
        {quiz.map((oneQuiz)=>
        <div key={oneQuiz._id}>
            <QuizCard quiz={oneQuiz}/>
            <Link to={`/quizzes/${oneQuiz._id}`} className='quiz-card-action'>Quiz Details</Link> 
        </div>
        )}
    </div>
  )
}

export default AllQuizzesPage