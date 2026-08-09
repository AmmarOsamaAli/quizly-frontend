
import api from './api'

async function getAllQuizzes(){
    const response = await api.get('/quizzes')
    return response.data
}

async function getQuizById(quizId){
    const response = await api.get(`/quizzes/${quizId}`)
    return response.data
}

export {
    getAllQuizzes,
    getQuizById
};

