import { getMyQuizzes } from '../../services/quizServices'
import React, { useEffect, useState } from 'react'
import QuizCard from '../../components/QuizCard'

function MyQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes() {
        try {
            const response = await getMyQuizzes()
            setQuiz(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadQuizzes()
    }, [])

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-6xl">

                <div className="mb-10">
                    <h1 className="text-4xl font-bold sm:text-5xl">My Quizzes</h1>

                    <p className="mt-3 max-w-2xl text-slate-600">
                        View and manage the quizzes you have created.
                    </p>
                </div>

                {quiz.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                        <h2 className="text-2xl font-semibold">No quizzes yet</h2>

                        <p className="mt-2 text-slate-500">
                            You haven&apos;t created any quizzes yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {quiz.map((oneQuiz) => (
                            <QuizCard key={oneQuiz._id} quiz={oneQuiz} isDetail={true} />
                        ))}
                    </div>
                )}

            </div>
        </main>
    )
}

export default MyQuizzesPage