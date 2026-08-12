import React from 'react'
import { useNavigate } from 'react-router'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function QuizCard({ quiz, isDetail, className }) {
  const navigate = useNavigate()

  const colors = {
    Hard: "border-red-400/20 bg-red-400/10 text-red-300",
    Easy: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    Medium: "border-amber-400/20 bg-amber-400/10 text-amber-300",
  }

  return (
    <Card
      className={`
        relative
        h-full
        border-white/10
        bg-white/10
        pt-3
        text-white
        shadow-xl
        backdrop-blur-xl
        transition
        hover:-translate-y-1
        hover:bg-white/15
        hover:shadow-2xl
        ${className || ""}
      `}
    >
      <CardHeader>
        <CardAction className="flex flex-wrap justify-end gap-2">
          <Badge variant="secondary" className={`border ${colors[quiz.difficulty]}`} >
            {quiz.difficulty}
          </Badge>

          <Badge variant="secondary" className="border border-white/10 bg-white/10 text-slate-300" >
            {quiz.category}
          </Badge>

          <Badge variant="secondary" className="border border-cyan-400/20 bg-cyan-400/10 text-cyan-300" >
            {quiz.visibility}
          </Badge>
        </CardAction>

        <CardTitle className="mt-3 line-clamp-2 text-xl font-black">
          {quiz.title}
        </CardTitle>
      </CardHeader>

      <CardDescription className="line-clamp-3 min-h-16 px-6 text-sm leading-6 text-slate-400">
        {quiz.description || "No description provided."}
      </CardDescription>

      <CardFooter className="mt-auto pt-5">
        {isDetail && (
          <Button
            onClick={() => navigate(`/quizzes/${quiz._id}`)}
            className="w-full rounded-xl bg-cyan-400 font-black text-slate-950 transition hover:bg-cyan-300"
          >
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default QuizCard