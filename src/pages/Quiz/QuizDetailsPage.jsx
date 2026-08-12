import React, { useEffect, useState } from "react"
import {
    deleteQuestion,
    getQuizById,
    deleteQuiz
} from "../../services/quizServices"

import { createGame } from "@/services/gameService"
import { useParams, useNavigate } from "react-router"
import { useAuth } from "../../context/AuthContext"
import QuizCard from "../../components/QuizCard"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

function QuizDetailsPage() {
    const { quizId } = useParams()
    const { user } = useAuth()

    const [quiz, setQuiz] = useState(null)
    const [hosting, setHosting] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const isOwner =
        user &&
        quiz &&
        quiz.owner._id === user._id

    const canHost =
        quiz &&
        (quiz.visibility === "Public" || isOwner)

    async function loadQuizzes() {
        try {
            const response = await getQuizById(quizId)
            setQuiz(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadQuizzes()
    }, [quizId])

    async function handleDeleteQuiz() {
        try {
            await deleteQuiz(quiz._id)
            navigate("/quizzes/my-quizzes")
        } catch (error) {
            setError(error.message || "Could not delete quiz")
        }
    }

    async function handleDeleteQuestion(questionId) {
        try {
            await deleteQuestion(quiz._id, questionId)

            setQuiz({
                ...quiz,
                questions: quiz.questions.filter((q) => q._id !== questionId)
            })
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Could not delete question"
            )
        }
    }

    async function handleHostGame() {
        if (hosting) {
            return
        }

        setError("")
        setHosting(true)

        try {
            const createdGame = await createGame(quizId)

            navigate(`/games/${createdGame._id}/host`)
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Could not create game"
            )
        } finally {
            setHosting(false)
        }
    }

    if (loading) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-5 py-3 text-slate-600 shadow-sm">
                        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-indigo-600" />
                        Loading quiz...
                    </div>
                </div>
            </main>
        )
    }

    if (!quiz) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <h1 className="text-2xl font-semibold">Quiz Not Found</h1>

                        <p className="mt-2 text-slate-500">
                            This quiz could not be found.
                        </p>

                        <Button onClick={() => navigate("/quizzes")} className="mt-6 rounded-md bg-indigo-600 px-6 font-semibold text-white hover:bg-indigo-700">
                            Back to Quizzes
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
            <div className="mx-auto max-w-6xl">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        {quiz.title}
                    </h1>

                    <p className="mt-3 text-slate-600">
                        View the quiz questions and start a live game when you&apos;re ready.
                    </p>
                </div>

                <QuizCard quiz={quiz} className="mt-5" />

                <div className="mt-6 flex flex-wrap gap-3">
                    {canHost && (
                        <Button onClick={handleHostGame} disabled={hosting} className="rounded-md bg-indigo-600 px-6 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-40">
                            {hosting ? "Creating Game..." : "Host Quiz"}
                        </Button>
                    )}

                    {isOwner && (
                        <>
                            <Button variant="outline" onClick={() => navigate(`/quizzes/${quiz._id}/edit`)} className="rounded-md border-slate-300 bg-white px-6 text-slate-700 hover:bg-slate-100">
                                Edit Quiz Info
                            </Button>

                            <Button variant="destructive" onClick={handleDeleteQuiz} className="rounded-md border border-red-200 bg-white px-6 text-red-600 hover:bg-red-50">
                                Delete Quiz
                            </Button>
                        </>
                    )}
                </div>

                {error && (
                    <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
                        {error}
                    </div>
                )}

                <section className="mt-12">

                    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-bold">
                                Quiz Questions
                            </h2>

                            <p className="mt-2 text-slate-600">
                                Review the questions included in this quiz.
                            </p>
                        </div>

                        <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                            {quiz.questions.length} {quiz.questions.length === 1 ? "question" : "questions"}
                        </span>
                    </div>

                    {quiz.questions.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                            <h3 className="text-xl font-semibold">
                                No questions yet
                            </h3>

                            <p className="mt-2 text-slate-500">
                                This quiz does not have any questions.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                            <Table>
                                <TableCaption className="pb-5 text-slate-500">
                                    A list of the questions in this quiz.
                                </TableCaption>

                                <TableHeader>
                                    <TableRow className="border-slate-200 hover:bg-transparent">
                                        <TableHead className="px-6 py-4 font-semibold text-slate-600">
                                            Question
                                        </TableHead>

                                        {isOwner && (
                                            <TableHead className="px-6 py-4 text-right font-semibold text-slate-600">
                                                Actions
                                            </TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {quiz.questions.map((question, index) => (
                                        <TableRow key={question._id} className="border-slate-200 transition hover:bg-slate-50">
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-start gap-4">
                                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-sm font-semibold text-slate-600">
                                                        {index + 1}
                                                    </span>

                                                    <div>
                                                        <p className="font-medium text-slate-900">
                                                            {question.text}
                                                        </p>

                                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                                                            <span>{question.choices?.length || 0} choices</span>
                                                            <span>{question.timeLimit || 30}s</span>
                                                            <span>{question.points || 1000} points</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {isOwner && (
                                                <TableCell className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button onClick={() => navigate(`/quizzes/${quiz._id}/questions/${question._id}/edit`)} className="rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-100">
                                                            Edit
                                                        </Button>

                                                        <Button onClick={() => handleDeleteQuestion(question._id)} className="rounded-md border border-red-200 bg-white text-red-600 hover:bg-red-50">
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>
                    )}

                    {isOwner && (
                        <Button onClick={() => navigate(`/quizzes/${quiz._id}/questions/add`)} className="mt-6 rounded-md bg-indigo-600 px-6 font-semibold text-white hover:bg-indigo-700">
                            + Add Question
                        </Button>
                    )}

                </section>

            </div>
        </main>
    )
}

export default QuizDetailsPage