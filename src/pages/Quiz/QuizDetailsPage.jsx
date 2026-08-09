import React, { useEffect, useState } from "react";
import { getQuizById } from "../../services/quizServices";
import { useParams, useNavigate } from "react-router";

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
                    <h2>Title: {quiz.title}</h2>
                    <p>{quiz.description}</p>
                    <p>Difficulty: {quiz.difficulty}</p>
                    <p>Category{quiz.category}</p>
                    <p>Visibility: {quiz.visibility}</p>
                    <p>Questions: </p>
                    <ol>
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
