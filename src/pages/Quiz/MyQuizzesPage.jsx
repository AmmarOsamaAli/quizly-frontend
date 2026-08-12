import { getMyQuizzes } from '../../services/quizServices'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import QuizCard from '../../components/QuizCard'

function MyQuizzesPage() {
    const [quiz, setQuiz] = useState([])

    async function loadQuizzes() {
        try {
            const response = await getMyQuizzes()
            setQuiz(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadQuizzes()
    }, [])

    return (
        <div>
            <h1>My Quizzes</h1>
            {quiz.map((oneQuiz) =>
                <>
                    <QuizCard quiz={oneQuiz} key={oneQuiz} />
                    <Link to={`/quizzes/${oneQuiz._id}`} className='quiz-card-action'>Quiz Details</Link>
                </>
            )}
        </div>
    )
}

export default MyQuizzesPage