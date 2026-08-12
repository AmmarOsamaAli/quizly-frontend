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
                questions: quiz.questions.filter(
                    (q) => q._id !== questionId
                )
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
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-slate-300 backdrop-blur-xl">
                        <span className="h-3 w-3 animate-pulse rounded-full bg-cyan-400" />
                        Loading quiz...
                    </div>
                </div>
            </main>
        )
    }

    if (!quiz) {
        return (
            <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl">
                            ?
                        </div>

                        <h1 className="mt-5 text-3xl font-black">
                            Quiz Not Found
                        </h1>

                        <p className="mt-2 text-slate-400">
                            This quiz could not be found.
                        </p>

                        <Button
                            onClick={() => navigate("/quizzes")}
                            className="mt-7 rounded-xl bg-cyan-400 px-6 font-black text-slate-950 hover:bg-cyan-300"
                        >
                            Back to Quizzes
                        </Button>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Page heading */}
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
                        Quiz Details
                    </p>

                    <h1 className="mt-2 text-4xl font-black sm:text-5xl">
                        {quiz.title}
                    </h1>

                    <p className="mt-3 text-slate-400">
                        View the quiz questions and start a live game when you&apos;re ready.
                    </p>
                </div>

                {/* Quiz summary */}
                <QuizCard
                    quiz={quiz}
                    className="mt-5"
                />

                {/* Actions */}
                <div className="mt-6 flex flex-wrap gap-3">

                    {canHost && (
                        <Button
                            onClick={handleHostGame}
                            disabled={hosting}
                            className="rounded-xl bg-cyan-400 px-6 font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
                        >
                            {hosting
                                ? "Creating Game..."
                                : "Host Quiz"}
                        </Button>
                    )}

                    {isOwner && (
                        <>
                            <Button
                                variant="outline"
                                onClick={() =>
                                    navigate(`/quizzes/${quiz._id}/edit`)
                                }
                                className="rounded-xl border-white/15 bg-white/5 px-6 text-slate-200 hover:bg-white/10 hover:text-white"
                            >
                                Edit Quiz Info
                            </Button>

                            <Button
                                variant="destructive"
                                onClick={handleDeleteQuiz}
                                className="rounded-xl border border-red-400/20 bg-red-400/10 px-6 text-red-300 hover:bg-red-400/20"
                            >
                                Delete Quiz
                            </Button>
                        </>
                    )}

                </div>

                {error && (
                    <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 font-semibold text-red-300">
                        {error}
                    </div>
                )}

                {/* Questions */}
                <section className="mt-12">

                    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                                Questions
                            </p>

                            <h2 className="mt-2 text-3xl font-black">
                                Quiz Questions
                            </h2>
                        </div>

                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                            {quiz.questions.length}{" "}
                            {quiz.questions.length === 1
                                ? "question"
                                : "questions"}
                        </span>
                    </div>

                    {quiz.questions.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center">
                            <h3 className="text-xl font-black">
                                No questions yet
                            </h3>

                            <p className="mt-2 text-slate-400">
                                This quiz does not have any questions.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">

                            <Table>
                                <TableCaption className="pb-5 text-slate-500">
                                    A list of the questions in this quiz.
                                </TableCaption>

                                <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="px-6 py-4 font-bold text-slate-400">
                                            Question
                                        </TableHead>

                                        {isOwner && (
                                            <TableHead className="px-6 py-4 text-right font-bold text-slate-400">
                                                Actions
                                            </TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {quiz.questions.map((question, index) => (
                                        <TableRow
                                            key={question._id}
                                            className="border-white/10 transition hover:bg-white/5"
                                        >
                                            <TableCell className="px-6 py-5">
                                                <div className="flex items-start gap-4">
                                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-black text-cyan-300">
                                                        {index + 1}
                                                    </span>

                                                    <div>
                                                        <p className="font-bold text-white">
                                                            {question.text}
                                                        </p>

                                                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                                                            <span>
                                                                {question.choices?.length || 0} choices
                                                            </span>

                                                            <span>
                                                                {question.timeLimit || 30}s
                                                            </span>

                                                            <span>
                                                                {question.points || 1000} points
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {isOwner && (
                                                <TableCell className="px-6 py-5 text-right">
                                                    <div className="flex justify-end gap-2">

                                                        <Button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/quizzes/${quiz._id}/questions/${question._id}/edit`
                                                                )
                                                            }
                                                            className="rounded-xl border border-white/15 bg-white/10 text-white hover:bg-white/15"
                                                        >
                                                            Edit
                                                        </Button>

                                                        <Button
                                                            onClick={() =>
                                                                handleDeleteQuestion(question._id)
                                                            }
                                                            className="rounded-xl border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
                                                        >
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
                        <Button
                            onClick={() =>
                                navigate(
                                    `/quizzes/${quiz._id}/questions/add`
                                )
                            }
                            className="mt-6 rounded-xl bg-cyan-400 px-6 font-black text-slate-950 hover:bg-cyan-300"
                        >
                            + Add Question
                        </Button>
                    )}

                </section>

            </div>
        </main>
    )
}

export default QuizDetailsPage