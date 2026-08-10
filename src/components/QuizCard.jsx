import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

function QuizCard({quiz}) {
  return (
    <div className='quiz-card'>
        <h2>Title: {quiz.title}</h2>
        <p>{quiz.description}</p>
        <p>Difficulty: {quiz.difficulty}</p>
        <p>Category{quiz.category}</p>
        <p>Visibility: {quiz.visibility}</p>
    </div>
  )
}

export default QuizCard