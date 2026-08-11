import React, { useState } from 'react'
import QuizForm from '../../components/QuizForm'
import QuestionForm from '../../components/QuestionForm';
import { useNavigate } from 'react-router';
import { createQuiz } from '../../services/quizServices';
import QuizCard from '../../components/QuizCard';

function CreateQuizPage() {
  
  const navigate = useNavigate()

  const [quizInfo, setQuizInfo] = useState(null)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')

  function handleQuizInfoSubmit(formData){
    setQuizInfo(formData)
    setError('')
  }
  function handleAddQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
    setError('')
  }
  function handleRemoveQuestion(indexToRemove){
    setQuestions(questions.filter((_, index) => index !== indexToRemove))
  }

  async function handleSubmit(event){
    if (questions.length === 0){
      return setError('Please add at least one question!')
    }
    const fullQuizPayload = {...quizInfo, questions: questions}

    try{
      const response = await createQuiz(fullQuizPayload)
      const createdQuiz = response
      navigate(`/quizzes/${createdQuiz._id}`)
    }catch(error){
      setError(error.message)
    }
  }

  return (
    <div className="create-quiz-page">
      <h1>Create New Quiz</h1>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {!quizInfo ? (
        <section>
          <h2>Step 1: Quiz Deetails</h2>
          <QuizForm onSubmit={handleQuizInfoSubmit}/>  
        </section>
      ) : (
        <section>
          <div className='quiz-header-summary'>
            <QuizCard quiz={quizInfo}/>
            <button type='button' onClick={()=>{setQuizInfo(null)}}>Edit Quiz Details</button>
          </div>
          <div className='added-questions-list'>
            <h3>Added Questions ({questions.length})</h3>
            {questions.map((oneQuestion, index)=>
              <div key={index}>
                <p><strong>Q{index+1}: {oneQuestion.text}</strong></p>
                <button type='button' onClick={()=>handleRemoveQuestion(index)}>Delete</button>
              </div>
            )}
          </div>
          <QuestionForm onSubmit={handleAddQuestion} buttonLabel='+ Add Question'/>
          <button
          type='button'
          onClick={handleSubmit}
          disabled={questions.length === 0}>Create Quiz</button>
        </section>
      ) }
    </div>
  )
}

export default CreateQuizPage