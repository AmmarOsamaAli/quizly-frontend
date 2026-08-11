import React, { useState } from 'react'

function CreateQuizPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    difficulty: '',
    visibility: '',
    question: [''],
    description: '',
  })

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
    <div onSubmit={handleSubmit} >
        <h1>Create New Quiz!</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">title</label>
          <input 
          type="text"
          name='title'
          id='title'
          onChange={handleChange} />
          <br />
          <br />
          <label htmlFor="category">category</label>
          <input 
          type="text"
          name='category'
          id='category'
          onChange={handleChange} />


            
        </form>
    </div>
  )
}

export default CreateQuizPage