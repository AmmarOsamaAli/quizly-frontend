import QuestionForm from '@/components/QuestionForm'
import { createQuestion } from '@/services/quizServices'
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'

function AddQuestionPage() {
    const { quizId } = useParams()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    async function handleAddQuestion(newQuestion) {
        try {
            await createQuestion(quizId, newQuestion)
            setError('')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <QuestionForm onSubmit={handleAddQuestion} />
            <button type='button' onClick={() => navigate(`/quizzes/${quizId}`)}>
                Done
            </button>
        </div>
    )
}

export default AddQuestionPage