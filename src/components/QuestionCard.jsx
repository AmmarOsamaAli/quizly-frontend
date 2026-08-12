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
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-slate-400">
        No Questions Found
      </div>
    )
  }

  const choiceStyles = [
    "border-indigo-400/20 bg-indigo-400/5",
    "border-cyan-400/20 bg-cyan-400/5",
    "border-rose-400/20 bg-rose-400/5",
    "border-amber-400/20 bg-amber-400/5"
  ]

  const choiceLabels = [
    "bg-indigo-500",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-amber-400 text-slate-950"
  ]

  return (
    <Card className="my-4 border-white/10 bg-white/10 text-white shadow-xl backdrop-blur-xl">

      <CardHeader>
        <CardTitle className="pr-4 text-xl font-black leading-relaxed">
          {index !== undefined && (
            <span className="mr-2 text-cyan-300">
              {index + 1}.
            </span>
          )}
          {question.text}
        </CardTitle>

        {actions && (
          <CardAction> {actions} </CardAction>
        )}

      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {question.choices?.map((choice, i) => {
            const isCorrect = choice === question.answer

            return (
              <li
                key={i}
                className={`flex items-center gap-3 rounded-2xl border p-4 text-sm font-semibold
                  ${isCorrect
                    ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                    : `${choiceStyles[i % choiceStyles.length]} text-slate-300`
                  }
                `}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black text-white
                    ${isCorrect
                      ? 'bg-emerald-500'
                      : choiceLabels[i % choiceLabels.length]
                    }
                  `}
                >
                  {isCorrect ? '✓' : String.fromCharCode(65 + i)}
                </span>

                <span className="flex-1">
                  {choice}
                </span>

                {isCorrect && (
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                    Correct
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3 border-t border-white/10 pt-5 text-sm text-slate-400">

        <span className="rounded-full bg-white/5 px-3 py-2">
          ⏱ {question.timeLimit || 30}s
        </span>

        <span className="rounded-full bg-white/5 px-3 py-2">
          🎯 {question.points || 1000} points
        </span>

      </CardFooter>

    </Card>
  )
}

export default QuestionCard