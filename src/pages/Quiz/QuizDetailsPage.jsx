import React, { useEffect, useState } from "react";
import { deleteQuestion, getQuizById } from "../../services/quizServices";
import { createGame } from "@/services/gameService";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import QuizCard from "../../components/QuizCard";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

function QuizDetailsPage() {
    const { quizId } = useParams();
    const { user } = useAuth();
    const [quiz, setQuiz] = useState(null);
    const [hosting, setHosting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isOwner = user && quiz && quiz.owner._id === user._id;
    const canHost = quiz && (quiz.visibility === 'Public' || isOwner);

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

    async function handleDeleteQuestion(questionId){
        try{
            await deleteQuestion(quiz._id, questionId)
            setQuiz({...quiz, questions: quiz.questions.filter(q=>q._id !== questionId)})
        }catch(error){
            setError(error.message)
        }
    }

    async function handleHostGame() {
        if (hosting) {
            return;
        }

        setError("");
        setHosting(true);

        try {
            const createdGame = await createGame(quizId);

            navigate(`/games/${createdGame._id}/host`);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Could not create game"
            );
        } finally {
            setHosting(false);
        }
    }

    return (
        <div className="w-[75%] mt-5 mx-auto">
            <h1>Quiz Details</h1>
            {quiz ? (
                <>
                    <QuizCard quiz={quiz} className="mt-5" />

                    <div className="mt-5 flex gap-3">
                        {canHost && (
                            <Button
                                onClick={handleHostGame}
                                disabled={hosting}
                            >
                                {hosting ? "Creating Game..." : "Host Quiz"}
                            </Button>
                        )}
                    </div>

                    {error && (
                        <p className="error mt-3">{error}</p>
                    )}

                    <Table className="mt-10">
                        <TableCaption>A list of the questions.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-25">Question</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quiz.questions.map((e, i) => {
                                return (
                                    <TableRow key={e._id}>
                                        <TableCell className="font-medium">Q{i + 1}: {e.text}</TableCell>
                                        <TableCell className="text-right">
                                            {isOwner && (
                                                <div className="flex justify-end items-center gap-3">
                                                    <Button onClick={()=>{navigate(`/quizzes/${quiz._id}/questions/${e._id}/edit`)}}>
                                                        Edit
                                                    </Button>
                                                    <Button className="bg-red-400 hover:bg-red-300" onClick={()=>{handleDeleteQuestion(e._id)}}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                        {isOwner && (
                            <button onClick={() => { navigate(`/quizzes/${quiz._id}/questions/add`) }}>Add Question</button>
                        )}
                    </Table>
                </>
            ) : (
                <p>not found</p>
            )}
        </div>
    );
}

export default QuizDetailsPage;