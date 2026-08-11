import React, { useState } from 'react'
import QuizForm from '../../components/QuizForm'

function CreateQuizPage() {
  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event){
    event.preventDefault()
    try{
      const createdQuiz = await createdQuiz(formData)
      Navigate('/quizzes'+createdQuiz._id)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      <QuizForm/>
    </div>
  )
}

export default CreateQuizPage