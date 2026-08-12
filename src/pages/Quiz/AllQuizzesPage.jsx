import React, { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quizServices'
import QuizCard from '../../components/QuizCard'

function AllQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes() {
        try {
            const response = await getAllQuizzes()
            setQuiz(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadQuizzes()
    }, [])

    return (
        <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-6xl">

                <div className="mb-10">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                        Discover
                    </p>

                    <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                        All Quizzes
                    </h1>

                    <p className="mt-3 max-w-2xl text-slate-400">
                        Browse public quizzes and choose one to explore.
                    </p>
                </div>

                {quiz.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center">
                        <h2 className="text-2xl font-black">
                            No quizzes found
                        </h2>

                        <p className="mt-2 text-slate-400">
                            There are no quizzes available right now.
                        </p>
                    </div>
                ) : (
                    <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {quiz.map((oneQuiz) => (
                            <QuizCard
                                key={oneQuiz._id}
                                quiz={oneQuiz}
                                isDetail={true}
                            />
                        ))}
                    </div>
                )}

            </div>
        </main>
    )
}

export default AllQuizzesPage