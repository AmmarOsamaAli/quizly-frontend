import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
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

function QuizCard({ quiz, isDetail }) {


  const navigate = useNavigate()

  const colors = {
    "Hard": "bg-red-500/20 text-red-400",
    "Easy": "bg-green-500/20 text-green-400",
    "Medium": "bg-yellow-500/20 text-yellow-400" 
  }

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-3">
      <CardHeader>
        <CardAction>
          <Badge variant="secondary" className={colors[quiz.difficulty]}>{quiz.difficulty}</Badge>
          <Badge variant="secondary" className="bg-grey-200 ">{quiz.category}</Badge>
          <Badge variant="secondary">{quiz.visibility}</Badge>

        </CardAction>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardDescription className="px-4">
        {quiz.description}
      </CardDescription>
      <CardFooter>
        {isDetail && (
          <Button onClick={() => navigate(`/quizzes/${quiz._id}`)} className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default QuizCard