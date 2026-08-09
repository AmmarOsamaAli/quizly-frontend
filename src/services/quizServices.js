
import api from './api'

async function getAllQuizzes(){
    const response = await api.get('/quizzes')
    return response.data
}

export {
    getAllQuizzes
};

