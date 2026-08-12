import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'

import QuestionForm from '@/components/QuestionForm'
import {
    getQuestionById,
    updateQuestion
} from '@/services/quizServices'

function EditQuestionPage() {
    const { quizId, questionId } = useParams()
    const navigate = useNavigate()

    const [question, setQuestion] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        async function loadQuestion() {
            try {
                const foundQuestion = await getQuestionById(
                    quizId,
                    questionId
                )

                setQuestion(foundQuestion)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        loadQuestion()
    }, [quizId, questionId])

    async function handleUpdate(formData) {
        setSubmitting(true)
        setError('')

        try {
            await updateQuestion(
                quizId,
                questionId,
                formData
            )

            navigate(`/quizzes/${quizId}`)
        } catch (error) {
            setError(error.message)
        } finally {
            setSubmitting(false)
        }
    }

    function handleCancel() {
        navigate(`/quizzes/${quizId}`)
    }

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                        Loading question...
                    </div>
                </div>
            </main>
        )
    }

    if (error && !question) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-semibold text-red-700">Could not load question</h1>

                        <p className="mt-3 text-red-600">
                            {error}
                        </p>

                        <button type="button" onClick={() => navigate(`/quizzes/${quizId}`)} className="mt-6 rounded-md border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
                            Back to Quiz
                        </button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-4xl">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold sm:text-5xl">Edit Question</h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Update the question details and save your changes.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
                        {error}
                    </div>
                )}

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <QuestionForm onSubmit={handleUpdate} initialData={question} buttonLabel={isSubmitting ? 'Saving...' : 'Save Changes'} onCancel={handleCancel} />
                </section>

            </div>
        </main>
    )
}

export default EditQuestionPage