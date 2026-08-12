import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

function QuestionCard({ question, index, actions }) {
  if (!question) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center text-slate-500">
        No Questions Found
      </div>
    )
  }

  return (
    <Card className="my-4 border border-slate-200 bg-white text-slate-900 shadow-sm">

      <CardHeader>
        <CardTitle className="pr-4 text-xl font-semibold leading-relaxed">
          {index !== undefined && (
            <span className="mr-2 text-slate-500">
              {index + 1}.
            </span>
          )}

          {question.text}
        </CardTitle>

        {actions && (
          <CardAction>
            {actions}
          </CardAction>
        )}
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {question.choices?.map((choice, i) => {
            const isCorrect = choice === question.answer

            return (
              <li key={i} className={`flex items-center gap-3 rounded-lg border p-4 text-sm font-medium ${isCorrect ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-slate-200 bg-slate-50 text-slate-700'}`}>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {isCorrect ? '✓' : String.fromCharCode(65 + i)}
                </span>

                <span className="flex-1">
                  {choice}
                </span>

                {isCorrect && (
                  <span className="text-xs font-semibold text-emerald-700">
                    Correct
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-4 border-t border-slate-200 pt-5 text-sm text-slate-500">
        <span>
          ⏱ {question.timeLimit || 30}s
        </span>

        <span>
          🎯 {question.points || 1000} points
        </span>
      </CardFooter>

    </Card>
  )
}

export default QuestionCard