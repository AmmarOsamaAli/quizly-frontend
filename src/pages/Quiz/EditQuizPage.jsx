import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import QuizForm from '../../components/QuizForm'
import { updateQuiz, getQuizById } from '../../services/quizServices'

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
            setError('')

            await updateQuiz(quizId, formData)

            navigate(`/quizzes/${quizId}`)
        } catch (error) {
            setError(error.message)
        }
    }

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-slate-300 backdrop-blur-xl">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                        Loading quiz details...
                    </div>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
                    <div className="w-full max-w-lg rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center shadow-2xl backdrop-blur-xl">
                        <h1 className="text-2xl font-black text-red-300">
                            Could not load quiz
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
                        Quiz Settings
                    </p>

                    <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                        Edit Quiz
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">
                        Update the quiz details below and save your changes when you're done.
                    </p>
                </div>

                <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <QuizForm
                        onSubmit={handleSubmit}
                        initialData={quizData}
                        buttonLabel="Save Changes"
                    />
                </section>

            </div>
        </main>
    )
}

export default EditQuizPage