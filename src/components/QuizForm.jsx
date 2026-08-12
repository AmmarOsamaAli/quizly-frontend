import React, { useState } from 'react'

function QuizForm({ onSubmit, initialData = {}, buttonLabel = "Next: Add Question" }) {
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'General Knowledge',
        visibility: initialData.visibility || 'Public',
        difficulty: initialData.difficulty || 'Medium'
    })

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        onSubmit({
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim()
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium text-slate-700">
                    Title
                </label>

                <input name="title" id="title" onChange={handleChange} value={formData.title} type="text" placeholder="e.g. Football Quiz" required className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </div>

            <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium text-slate-700">
                    Description
                </label>

                <textarea id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Describe what this quiz covers..." rows="4" className="w-full resize-none rounded-md border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

                <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium text-slate-700">
                        Category
                    </label>

                    <select name="category" id="category" value={formData.category} onChange={handleChange} className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="Science">Science</option>
                        <option value="Technology">Technology</option>
                        <option value="History">History</option>
                        <option value="Sports">Sports</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="difficulty" className="text-sm font-medium text-slate-700">
                        Difficulty
                    </label>

                    <select name="difficulty" id="difficulty" value={formData.difficulty} onChange={handleChange} className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

            </div>

            <div className="grid gap-2">
                <label htmlFor="visibility" className="text-sm font-medium text-slate-700">
                    Visibility
                </label>

                <select name="visibility" id="visibility" value={formData.visibility} onChange={handleChange} className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20">
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
            </div>

            <button type="submit" className="w-full rounded-md bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700">
                {buttonLabel}
            </button>

        </form>
    )
}

export default QuizForm