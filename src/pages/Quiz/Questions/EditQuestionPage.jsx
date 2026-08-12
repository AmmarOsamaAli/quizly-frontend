import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router'
import QuestionForm from '@/components/QuestionForm'
import { getQuestionById, updateQuestion } from '@/services/quizServices'
function EditQuestionPage() {
    const {quizId, questionId} = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(()=>{
        async function loadQuestion(){
            try{
                const foundQuestion = await getQuestionById(quizId, questionId)
                setQuestion(foundQuestion)
            }catch(error){
                setError(error.message)
            }finally{
                setLoading(false)
            }
        }
        loadQuestion()
    }, [quizId, questionId])

    async function handleUpdate(formData){
        setSubmitting(true)
        setError('')    
        try {
            await updateQuestion(quizId, questionId, formData)
            navigate(`/quizzes/${quizId}`)
        } catch (error) {
            setError(error.message)
        }
    }

    function handleCancel() {
        navigate(`/quizzes/${quizId}/edit`)
    }

    if(loading) return <p>Loading question...</p>
    if(error && !question) return <p style={{color:'red'}}>{error}</p>

  return (
    <div className='edit-question'>
        <h1>Edit Question</h1>
        {error && <p style={{color:'red'}}>{error}</p>}
        <QuestionForm
            onSubmit={handleUpdate}
            initialData={question}
            buttonLabel={isSubmitting ? 'Saving...' : 'Save Changes' }
            onCancel={handleCancel}
        />        
    </div>
  )
}

export default EditQuestionPage