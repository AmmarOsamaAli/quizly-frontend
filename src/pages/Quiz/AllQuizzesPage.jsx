import React, { useEffect, useState } from 'react'
import { getAllQuizzes } from '../../services/quizServices'
import { Link } from 'react-router'
import QuizCard from '../../components/QuizCard'


function AllQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes(){
        try{
            const response = await getAllQuizzes()
            setQuiz(response)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        loadQuizzes()
    }, [])

  return (
    <div className='px-10 mt-10'>
        <h1 className='text-2xl font-bold'>All Quizzes</h1>
        <div className='grid mt-7 grid-cols-4 gap-4 items-start w-full'>
            {quiz.map((oneQuiz)=>
        <div key={oneQuiz._id}>
            <QuizCard quiz={oneQuiz} isDetail={true} />
        </div>
        )}
        </div>
    </div>
  )
}

export default AllQuizzesPage