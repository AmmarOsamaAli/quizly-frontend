import React from 'react'
import { useNavigate } from 'react-router'

function QuizCard({quiz}) {
  return (
    <div>
               <h2>Title: {quiz.title}</h2>
        <p>{quiz.description}</p>
        <p>Difficulty: {quiz.difficulty}</p>
        <p>Category{quiz.category}</p>
        <p>Visibility: {quiz.visibility}</p>
        <Link to={`/quizzes/${quiz._id}`} >Quiz Details</Link> 
    </div>
  )
}

export default QuizCard