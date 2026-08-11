import React, { useState } from 'react'
import './QuizForm.css'

function QuizForm({onSubmit, initialData = {}, buttonLabel="Next: Add Question"}) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'General Knowledge',
        visibility: initialData.visibility || 'Public',
        difficulty: initialData.difficulty || 'Medium'
})

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event){
    event.preventDefault()
    onSubmit({...formData,
        title: formData.title.trim(),
        description: formData.description.trim()
    })
  }
  return (
    <form onSubmit={handleSubmit} className='quiz-form'>
        <section>
            <label htmlFor="title">Title</label>
            <input 
            name='title'
            id='title'
            onChange={handleChange}
            value={formData.title}
            type="text"
            placeholder='e.g. Football Quiz'
            required />
        </section>
        <section>
            <label htmlFor="description">Description</label>
            <textarea
            id='description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            placeholder='Describe what this quiz covers ....'
            rows="3"
            />
        </section>
        <section>
            <label htmlFor="category">Category</label>
            <select 
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}>
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
            </select>
        </section>
        <section>
            <label htmlFor="difficulty">Difficulty</label>
            <select 
            name="difficulty"
            id="difficulty"
            value={formData.difficulty}
            onChange={handleChange}>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>
        </section>
        <section>
            <label htmlFor="visibility">Visibility</label>
            <select 
            name="visibility"
            id="visibility"
            value={formData.visibility}
            onChange={handleChange}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
            </select>
        </section>
        <button>{buttonLabel}</button>
    </form>
  )
}

export default QuizForm