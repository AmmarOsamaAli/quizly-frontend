import React, { useState } from 'react'
import QuizForm from '../../components/QuizForm'
import QuestionForm from '../../components/QuestionForm'
import { useNavigate } from 'react-router'
import { createQuiz } from '../../services/quizServices'
import QuizCard from '../../components/QuizCard'

function CreateQuizPage() {
  const navigate = useNavigate()

  const [quizInfo, setQuizInfo] = useState(null)
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState('')

  function handleQuizInfoSubmit(formData) {
    setQuizInfo(formData)
    setError('')
  }

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion])
    setError('')
  }

  function handleRemoveQuestion(indexToRemove) {
    setQuestions(
      questions.filter((_, index) => index !== indexToRemove)
    )
  }

  async function handleSubmit(event) {
    if (questions.length === 0) {
      return setError('Please add at least one question!')
    }

    const fullQuizPayload = {
      ...quizInfo,
      questions: questions
    }

    try {
      const response = await createQuiz(fullQuizPayload)
      const createdQuiz = response

      navigate(`/quizzes/${createdQuiz._id}`)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-300">
            Quiz Builder
          </p>

          <h1 className="mt-2 text-4xl font-black sm:text-5xl">
            Create New Quiz
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Set up your quiz details, add questions, and publish when you're ready.
          </p>
        </div>

        <div className="mb-10 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${!quizInfo
                ? 'bg-cyan-400 text-slate-950'
                : 'bg-emerald-400 text-slate-950'
              }`}
          >
            {!quizInfo ? '1' : '✓'}
          </div>

          <div className="h-px flex-1 bg-white/10" />

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full font-black ${quizInfo
                ? 'bg-cyan-400 text-slate-950'
                : 'bg-white/10 text-slate-500'
              }`}
          >
            2
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 font-semibold text-red-300">
            {error}
          </div>
        )}

        {!quizInfo ? (
          <section className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <div className="mb-7">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Quiz Details
              </h2>

              <p className="mt-2 text-slate-400">
                Give your quiz a title and configure its basic information.
              </p>
            </div>

            <QuizForm onSubmit={handleQuizInfoSubmit} />
          </section>
        ) : (
          <section>
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

              <div>
                <div className="sticky top-6">
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-cyan-300">
                    Quiz Summary
                  </p>

                  <QuizCard quiz={quizInfo} />

                  <button
                    type="button"
                    onClick={() => setQuizInfo(null)}
                    className="mt-4 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
                  >
                    Edit Quiz Details
                  </button>
                </div>
              </div>

              <div className="space-y-6">

                <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-xl sm:p-8">
                  <div className="mb-6">
                    <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
                      Step 2
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Add Questions
                    </h2>

                    <p className="mt-2 text-slate-400">
                      Add at least one question before creating the quiz.
                    </p>
                  </div>

                  <QuestionForm
                    onSubmit={handleAddQuestion}
                    buttonLabel="+ Add Question"
                  />
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-xl font-black">
                      Added Questions
                    </h3>

                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                      {questions.length}
                    </span>
                  </div>

                  {questions.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-slate-500">
                      No questions added yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {questions.map((oneQuestion, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                              Question {index + 1}
                            </p>

                            <p className="mt-1 font-bold">
                              {oneQuestion.text}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(index)}
                            className="shrink-0 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-bold text-red-300 transition hover:bg-red-400/20"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={questions.length === 0}
                  className="w-full rounded-2xl bg-cyan-400 px-6 py-4 text-lg font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  Create Quiz
                </button>

              </div>
            </div>
          </section>
        )}

      </div>
    </main>
  )
}

export default CreateQuizPage