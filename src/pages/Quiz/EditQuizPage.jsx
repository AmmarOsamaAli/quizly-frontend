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
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
                    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                        Loading quiz details...
                    </div>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
                    <div className="w-full max-w-lg rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-semibold text-red-700">Could not load quiz</h1>

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
                    <h1 className="text-4xl font-bold sm:text-5xl">Edit Quiz</h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        Update the quiz details below and save your changes when you're done.
                    </p>
                </div>

                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <QuizForm onSubmit={handleSubmit} initialData={quizData} buttonLabel="Save Changes" />
                </section>

            </div>
        </main>
    )
}

export default EditQuizPage