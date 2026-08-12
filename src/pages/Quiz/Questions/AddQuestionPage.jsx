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
        <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-4xl">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                        Quiz Builder
                    </p>

                    <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                        Add Question
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">
                        Add another question to your quiz, then return when you&apos;re done.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 font-semibold text-red-300">
                        {error}
                    </div>
                )}

                <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <QuestionForm onSubmit={handleAddQuestion} />
                </section>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate(`/quizzes/${quizId}`)}
                        className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-bold text-slate-200 transition hover:bg-white/15 hover:text-white"
                    >
                        Done
                    </button>
                </div>

            </div>
        </main>
    )
}

export default AddQuestionPage