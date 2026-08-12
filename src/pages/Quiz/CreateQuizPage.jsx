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
  const [step, setStep] = useState(1)

  function handleQuizInfoSubmit(formData) {
    setQuizInfo(formData)
    setStep(2)
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
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold sm:text-5xl">Create New Quiz</h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Set up your quiz details, add questions, and create it when you're ready.
          </p>
        </div>

        <div className="mb-10 flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
            {step === 1 ? '1' : '✓'}
          </div>

          <div className="h-px flex-1 bg-slate-300" />

          <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            2
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-700">
            {error}
          </div>
        )}

        {step === 1 ? (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-semibold">Quiz Details</h2>

              <p className="mt-2 text-slate-600">
                Give your quiz a title and configure its basic information.
              </p>
            </div>

            <QuizForm onSubmit={handleQuizInfoSubmit} initialData={quizInfo || {}} />
          </section>
        ) : (
          <section>
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">

              <div>
                <div className="sticky top-6">
                  <h2 className="mb-3 text-lg font-semibold">Quiz Summary</h2>

                  <QuizCard quiz={quizInfo} />

                  <button type="button" onClick={() => setStep(1)} className="mt-4 w-full rounded-md border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100">
                    Edit Quiz Details
                  </button>
                </div>
              </div>

              <div className="space-y-6">

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold">Add Questions</h2>

                    <p className="mt-2 text-slate-600">
                      Add at least one question before creating the quiz.
                    </p>
                  </div>

                  <QuestionForm onSubmit={handleAddQuestion} buttonLabel="+ Add Question" />
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Added Questions</h3>

                    <span className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                      {questions.length}
                    </span>
                  </div>

                  {questions.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                      No questions added yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {questions.map((oneQuestion, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-500">
                              Question {index + 1}
                            </p>

                            <p className="mt-1 font-medium text-slate-900">
                              {oneQuestion.text}
                            </p>
                          </div>

                          <button type="button" onClick={() => handleRemoveQuestion(index)} className="shrink-0 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button type="button" onClick={handleSubmit} disabled={questions.length === 0} className="w-full rounded-md bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40">
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