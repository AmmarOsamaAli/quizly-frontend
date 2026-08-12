import React, { useEffect, useState } from "react";
import { getQuizById } from "../../services/quizServices";
import { useParams, useNavigate } from "react-router";
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
        <div className="w-[75%] mt-5 mx-auto">
            <h1>Quiz Details</h1>
            {quiz ? (
                <>
                    <QuizCard quiz={quiz} className={"mt-5"} key={quiz} />
                    <Table className="mt-10">
                <TableCaption>A list of the questions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Question</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {quiz.questions.map((e, i) => {
                    return (
                         <TableRow>
                            <TableCell className="font-medium">Q{i+1}: {e.text}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end items-center gap-3">
                                    <Button>
                                        Edit
                                    </Button>
                                     <Button className="bg-red-400 hover:bg-red-300">
                                        Delete
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                   })}
                </TableBody>
                    <button onClick={()=>{navigate(`/quizzes/${quiz._id}/questions`)}}>Add Question</button>
                </Table>
                </>
            ) : (
                <p>not found</p>
            )}
        </div>
    );
}

export default QuizDetailsPage;
