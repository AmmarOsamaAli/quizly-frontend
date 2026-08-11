import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import './quizCard.css'

function QuizCard({quiz}) {
  return (
    <div className='quiz-card'>
        <h2>Title: {quiz.title}</h2>
        <p>{quiz.description}</p>
        <div className='quiz-card-meta'>
        <span className='quiz-card-badge'>Difficulty: {quiz.difficulty}</span>
        <span className='quiz-card-badge'>Category{quiz.category}</span>
        <span className='quiz-card-badge'>Visibility: {quiz.visibility}</span>
        </div>
    </div>
  )
}

export default QuizCard