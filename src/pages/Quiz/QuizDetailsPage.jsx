import React, { useEffect, useState } from "react";
import { getQuizById } from "../../services/quizServices";
import { useParams, useNavigate } from "react-router";
import QuizCard from "../../components/QuizCard";

function AllQuizzesPage() {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const navigate = useNavigate();

    async function loadQuizzes() {
        try {
            const response = await getQuizById(quizId);
            setQuiz(response);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadQuizzes();
    }, []);

    return (
        <div>
            <h1>Quiz Details</h1>
            {quiz ? (
                <>
                    <QuizCard quiz={quiz} key={quiz}/>
                    <p>Questions: </p>
                    <ol key={quiz.questions._id}>
                        {quiz.questions.map((oneQuestion) => (
                            <>
                                <li>{oneQuestion.text}</li>
                            </>
                        ))}
                    </ol>
                </>
            ) : (
                <p>not found</p>
            )}
        </div>
    );
}

export default AllQuizzesPage;
