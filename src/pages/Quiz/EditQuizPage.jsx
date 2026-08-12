import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import QuizForm from '../../components/QuizForm'
import { updateQuiz, getQuizById } from '../../services/quizServices'
import QuestionCard from '@/components/QuestionCard'

function EditQuizPage() {
    const navigate = useNavigate()
    const { quizId } = useParams()
    const [quizData, setQuizData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadQuiz() {
            try {
                const data = await getQuizById(quizId)
                setQuizData(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        loadQuiz()
    }, [quizId])

    async function handleSubmit(formData) {
        try {
            await updateQuiz(quizId, formData)
            navigate(`/quizzes/${quizId}`)
        } catch (error) {
            setError(error.message)
        }
    }
    if (loading) {
        return <p>Loading Quiz Details...</p>
    }
    if (error) {
        return <p style={{ color: "red" }}>{error}</p>
    }
    return (
        <div className='edit-quiz-details'>
            <h1>Edit Quiz Details</h1>
            <QuizForm
                onSubmit={handleSubmit}
                initialData={quizData}
                buttonLabel='Save Changes' />
            
        </div>
    )
}

export default EditQuizPage