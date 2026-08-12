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
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-4xl">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold sm:text-5xl">Add Question</h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Add another question to your quiz, then return when you&apos;re done.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
                        {error}
                    </div>
                )}

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <QuestionForm onSubmit={handleAddQuestion} />
                </section>

                <div className="mt-6 flex justify-end">
                    <button type="button" onClick={() => navigate(`/quizzes/${quizId}`)} className="rounded-md border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
                        Done
                    </button>
                </div>

            </div>
        </main>
    )
}

export default AddQuestionPage