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
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-slate-300 backdrop-blur-xl">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                        Loading question...
                    </div>
                </div>
            </main>
        )
    }

    if (error && !question) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="w-full max-w-lg rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center shadow-2xl backdrop-blur-xl">

                        <h1 className="text-2xl font-black text-red-300">
                            Could not load question
                        </h1>

                        <p className="mt-3 text-red-200/80">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate(`/quizzes/${quizId}`)}
                            className="mt-6 rounded-xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-slate-100"
                        >
                            Back to Quiz
                        </button>

                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-4xl">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                        Quiz Builder
                    </p>

                    <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                        Edit Question
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">
                        Update the question details and save your changes.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 font-semibold text-red-300">
                        {error}
                    </div>
                )}

                <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

                    <QuestionForm
                        onSubmit={handleUpdate}
                        initialData={question}
                        buttonLabel={
                            isSubmitting
                                ? 'Saving...'
                                : 'Save Changes'
                        }
                        onCancel={handleCancel}
                    />

                </section>

            </div>
        </main>
    )
}

export default EditQuestionPage