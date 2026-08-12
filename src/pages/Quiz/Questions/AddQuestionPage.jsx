import QuestionForm from '@/components/QuestionForm'
import { createQuestion } from '@/services/quizServices'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

function AddQuestionPage() {

    const [questions, setQuestions] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()
    function handleAddQuestion(newQuestion){
        setQuestions((prevQuestion)=>[...prevQuestion, newQuestion])
        setError('')
    }
    function handleRemoveQuestion(indexToRemove){
        setQuestions(questions.filter((_, index) => index !== indexToRemove))
    }

  async function handleSubmit(){
    try{
      const response = await createQuestion({questions})
      console.log(response)
      const createdQuiz = response
      navigate(`/quizzes/${createdQuiz._id}`)
    }catch(error){
      setError(error.message)
    }
  }


  return (
    <div>
          <QuestionForm onSubmit={handleAddQuestion}/>
    </div>
  )
}

export default AddQuestionPage