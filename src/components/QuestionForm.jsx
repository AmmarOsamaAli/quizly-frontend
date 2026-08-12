import React, { useState } from 'react'

function QuestionForm({ onSubmit, initialData = null, buttonLabel = "Add Question", onCancel }) {
    const [formData, setFormData] = useState({
        text: initialData?.text || '',
        choices: initialData?.choices || ['', '', '', ''],
        answer: initialData?.answer || '',
        timeLimit: initialData?.timeLimit || 30,
        points: initialData?.points || 1000
    })

    const [error, setError] = useState('')

    function handleChoiceChange(index, value) {
        const updatedChoices = [...formData.choices]
        updatedChoices[index] = value

        setFormData({
            ...formData,
            choices: updatedChoices
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const validChoices = formData.choices.filter((choice) => choice.trim() !== '')

        if (!formData.text.trim()) {
            return setError('Question text is required')
        }

        if (validChoices.length < 2) {
            return setError('Please enter at least 2 choices')
        }

        if (!formData.answer.trim()) {
            return setError('Please select the correct answer')
        }

        if (!validChoices.includes(formData.answer)) {
            return setError('Selected answer must match one of the choices')
        }

        onSubmit({
            ...formData,
            text: formData.text.trim(),
            choices: validChoices,
            timeLimit: Number(formData.timeLimit),
            points: Number(formData.points)
        })

        if (!initialData) {
            setFormData({
                text: '',
                choices: ['', '', '', ''],
                answer: '',
                timeLimit: 30,
                points: 1000
            })
        }

        setError('')
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-7">

            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            <div className="grid gap-2">
                <label htmlFor="text" className="text-sm font-medium text-slate-700">
                    Question
                </label>

                <input name="text" id="text" value={formData.text} onChange={handleChange} placeholder="e.g. What's the capital of Bahrain?" type="text" className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </div>

            <div>
                <div className="mb-4">
                    <h4 className="font-semibold text-slate-900">Answer Choices</h4>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter at least two possible answers.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {formData.choices.map((oneChoice, index) => (
                        <div key={index} className="grid gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                Choice {index + 1}
                            </label>

                            <input value={oneChoice} onChange={(event) => handleChoiceChange(index, event.target.value)} type="text" placeholder={`Choice ${index + 1}`} className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

                <div className="grid gap-2">
                    <label htmlFor="answer" className="text-sm font-medium text-slate-700">
                        Correct Answer
                    </label>

                    <select name="answer" onChange={handleChange} value={formData.answer} id="answer" className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                        <option value="">Select correct answer</option>

                        {formData.choices.map((oneChoice, index) =>
                            oneChoice.trim() && (
                                <option key={index} value={oneChoice}>
                                    {oneChoice}
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="timeLimit" className="text-sm font-medium text-slate-700">
                        Time Limit
                    </label>

                    <select name="timeLimit" id="timeLimit" value={formData.timeLimit} onChange={handleChange} className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                        <option value={10}>10 Seconds</option>
                        <option value={20}>20 Seconds</option>
                        <option value={30}>30 Seconds</option>
                        <option value={40}>40 Seconds</option>
                        <option value={50}>50 Seconds</option>
                        <option value={60}>60 Seconds</option>
                    </select>
                </div>

            </div>

            <div className="grid gap-2">
                <label htmlFor="points" className="text-sm font-medium text-slate-700">
                    Points
                </label>

                <input name="points" id="points" value={formData.points} onChange={handleChange} type="number" className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </div>

            <div className={`grid gap-3 ${onCancel ? 'sm:grid-cols-2' : ''}`}>
                <button type="submit" className="w-full rounded-md bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700">
                    {buttonLabel}
                </button>

                {onCancel && (
                    <button type="button" onClick={onCancel} className="w-full rounded-md border border-slate-300 bg-white px-6 py-4 font-medium text-slate-700 transition hover:bg-slate-100">
                        Cancel
                    </button>
                )}
            </div>

        </form>
    )
}

export default QuestionForm