import React from 'react'
import { useNavigate } from 'react-router'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function QuizCard({ quiz, isDetail, className }) {
  const navigate = useNavigate()

  const colors = {
    Hard: "border-red-200 bg-red-50 text-red-700",
    Easy: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Medium: "border-amber-200 bg-amber-50 text-amber-700",
  }

  return (
    <Card className={`h-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-slate-300 hover:shadow-md ${className || ""}`}>

      <CardHeader className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className={`border ${colors[quiz.difficulty]}`}>
            {quiz.difficulty}
          </Badge>

          <Badge variant="secondary" className="border border-slate-200 bg-slate-100 text-slate-600">
            {quiz.category}
          </Badge>

          <Badge variant="secondary" className="border border-indigo-200 bg-indigo-50 text-indigo-700">
            {quiz.visibility}
          </Badge>
        </div>

        <CardTitle className="line-clamp-2 text-xl font-semibold leading-snug">
          {quiz.title}
        </CardTitle>
      </CardHeader>

      <CardDescription className="line-clamp-3 min-h-16 px-6 text-sm leading-6 text-slate-500">
        {quiz.description || "No description provided."}
      </CardDescription>

      <CardFooter className="mt-auto pt-5">
        {isDetail && (
          <Button onClick={() => navigate(`/quizzes/${quiz._id}`)} className="w-full rounded-md bg-indigo-600 font-semibold text-white transition hover:bg-indigo-700">
            View Details
          </Button>
        )}
      </CardFooter>

    </Card>
  )
}

export default QuizCard