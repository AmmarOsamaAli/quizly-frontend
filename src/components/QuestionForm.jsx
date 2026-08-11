import React, { useState } from 'react'
import './QuestionForm.css'

function QuestionForm({ onSubmit, initialData = null, buttonLabel="Add Question", onCancel}) {
    const [formData, setFormData] = useState({
        text: initialData?.text || '',
        choices: initialData?.choices || ['', '', '', ''],
        answer: initialData?.answer || '',
        timeLimit: initialData?.timeLimit || 30,
        points: initialData?.points || 1000
    })
    const [error, setError] = useState('')

    const handleChoiceChange = (index, value) => {
        const updatedChoices = [...formData.choices]
        updatedChoices[index] = value
        setFormData({...formData, choices: updatedChoices})
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const validChoices = formData.choices.filter((choice)=>choice.trim()!=='')

        if(!formData.text.trim()){
            return setError('Question text is required')
        } 
        if (validChoices.length < 2){
            return setError('Please enter at least 2 choices')
        }
        if(!formData.answer.trim()){
            return setError('Please select the correct answer')
        }
        if(!validChoices.includes(formData.answer)){
            return setError('Selected answer must match one of the choices')
        }
        onSubmit({...formData,
            text: formData.text.trim(),
            choices: validChoices,
            timeLimit: Number(formData.timeLimit),
            points: Number(formData.points)
        })

        if(!initialData){
            setFormData({
                text: '',
                choices: ['','','',''],
                answer: '',
                timeLimit: 30,
                points: 1000
            })
        }
        setError('')
    }
    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  return (
    <form onSubmit={handleSubmit} className='question-form' >
        {error && <p style={{color: 'red'}}>{error}</p>}
        <section>
            <label htmlFor="text">Question Text:</label>
            <input 
            name='text'
            id='text'
            value={formData.text}
            onChange={handleChange}
            placeholder='e.g. Whats the capital of Bahrain?'
            type="text" />
        </section>
        <h4>Choices:</h4>
        {formData.choices.map((oneChoice, index)=>
            <section key={index}>
                <label>Choice {index + 1}</label>
                <input 
                value={oneChoice}
                onChange={(event) => handleChoiceChange(index, event.target.value)}
                type="text" />
            </section>
        )}
        <section>
            <label htmlFor="answer">Correct Answer</label>
            <select 
            name="answer"
            onChange={handleChange}
            value={formData.answer}
            id="answer">
                <option value="">-- Select Correct Answer --</option>
                {formData.choices.map((oneChoice, index)=>
                    oneChoice.trim() && <option key={index} value={oneChoice}>{oneChoice}</option>
                )}
            </select>
        </section>
        <section>
            <label htmlFor="timeLimit">Time Limit</label>
            <input 
            name='timeLimit'
            id='timeLimit'
            value={formData.timeLimit}
            onChange={handleChange}
            type="number" />
        </section>
        <section>
            <label htmlFor="points">Points</label>
            <input 
            name='points'
            id='points'
            value={formData.points}
            onChange={handleChange}
            type="number" />
        </section>
        <button>{buttonLabel}</button>
        {onCancel && <button type='button' onClick={onCancel}>Cancel</button>}
    </form>
  )
}

export default QuestionForm