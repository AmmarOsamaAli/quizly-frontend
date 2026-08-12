import api from './api'

async function createGame(quizId) {
    const response = await api.post(`/quizzes/${quizId}/games`)
    return response.data
}

async function joinGame(code) {
    const response = await api.post(`/games/code/${code}/join`)
    return response.data
}

async function getGameById(gameId) {
    const response = await api.get(`/games/${gameId}`)
    return response.data
}

async function startGame(gameId) {
    const response = await api.patch(`/games/${gameId}/start`)
    return response.data
}


async function submitAnswer(gameId, body) {
    const response = await api.post(`/games/${gameId}/answers`, body)
    return response.data
}


async function cancelGame(gameId) {
    const response = await api.patch(`/games/${gameId}/cancel`)
    return response.data
}

async function getGameResults(gameId) {
    const response = await api.get(`/games/${gameId}/results`)
    return response.data
}


export {
    createGame,
    joinGame,
    getGameById,
    startGame,
    submitAnswer,
    cancelGame,
    getGameResults,
}