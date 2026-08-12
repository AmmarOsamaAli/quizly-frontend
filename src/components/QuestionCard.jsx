import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/card' // Adjust path if needed

function QuestionCard({ question, index, actions }) {
  if (!question) return <p>No Questions Found</p>

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>
          {index !== undefined ? `${index + 1}. ` : ''}
          {question.text}
        </CardTitle>
        {actions && <CardAction>{actions}</CardAction>}
      </CardHeader>

      <CardContent>
        <ul className="space-y-2">
          {question.choices?.map((choice, i) => {
            const isCorrect = choice === question.answer
            return (
              <li
                key={i}
                className={`rounded-md border p-2 text-sm ${
                  isCorrect
                    ? 'border-green-500 bg-green-50 font-semibold text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'border-border bg-background'
                }`}
              >
                {choice} {isCorrect && '✓ (Correct)'}
              </li>
            )
          })}
        </ul>
      </CardContent>

      <CardFooter className="flex gap-4 text-xs text-muted-foreground">
        <span>⏱ Time: {question.timeLimit || 30}s</span>
        <span>🎯 Points: {question.points || 1000}</span>
      </CardFooter>
    </Card>
  )
}

export default QuestionCard