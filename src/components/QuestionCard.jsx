import React from 'react'

function QuestionCard({question, index}) {
  return (
    <div className='questions-card'>
        <h2>{question.text}</h2>

    </div>
  )
}

export default QuestionCard