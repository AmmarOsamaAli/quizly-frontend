import React, { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quizServices'
import { Link } from 'react-router'

function AllQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes(){
        try{
            const response = await getAllQuizzes()
            setQuiz(response)
            console.log(quiz)
        }catch(error){
            console.log(err)
        }
    }

    useEffect(()=>{
        loadQuizzes()
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
        <Link to={`/quizzes/${oneQuiz._id}`} >Quiz Details</Link>
        </>
        )}
    </div>
  )
}

export default AllQuizzesPage