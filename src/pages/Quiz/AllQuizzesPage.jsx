import React, { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quizServices'


function AllQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuistions(){
        try{
            const response = await getAllQuizzes()
            setQuiz(response)
            console.log(quiz)
        }catch(error){
            console.log(err)
        }
    }

    useEffect(()=>{
        loadQuistions()
    }, [])

  return (
    <div>
        <h1>All Quizzes</h1>
        {quiz.map((oneQuiz)=>
        <>
        <h2>Title: {oneQuiz.title}</h2>
        <p>{oneQuiz.description}</p>
        <p>Difficulty: {oneQuiz.difficulty}</p>
        <p>Category{oneQuiz.category}</p>
        <p>Visibility: {oneQuiz.visibility}</p>
        </>
        )}
    </div>
  )
}

export default AllQuizzesPage