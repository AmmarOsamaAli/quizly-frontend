
import api from './api'

async function getAllQuizzes(){
    const response = await api.get('/quizzes')
    return response.data
}

async function getQuizById(quizId){
    const response = await api.get(`/quizzes/${quizId}`)
    return response.data
}

async function getMyQuizzes(){
    const response = await api.get(`/quizzes/my-quizzes`)
    return response.data
}

async function createQuiz(body){
    const response = await api.post('/quizzes', body)
    return response.data
}

async function updateQuiz(quizId, body){
    const response = await api.put(`/quizzes/${quizId}`, body)
    return response.data
}

async function createQuestion(quizId, body){
    const response = await api.post(`/quizzes/${quizId}/questions`, body)
    return response.data
}



export {
    getAllQuizzes,
    getQuizById,
    getMyQuizzes,
    createQuiz, 
    updateQuiz,
    createQuestion
};

