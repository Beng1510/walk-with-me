import axios from 'axios'
import { httpService } from './http-service.js'
const baseUrl = 'http://localhost:3000';


export const userService = {
    login,
    logout,
    signup,
    getUserById,
    getUsers,
    // updateUser,
    updateFavTrips,
    // getReviewsByGuide 
}


async function getUserById(userId) {
    const res = await axios.get(`${baseUrl}/user/${userId}`)
    return res.data

    // return httpService.get(`user/${userId}`)
}

async function getUsers() {
    // return httpService.get('user')
    const res = await axios.get(`${baseUrl}/user`)
<<<<<<< HEAD
=======

>>>>>>> dev
    return res.data
}
// function updateUser(user) {
//     return httpService.put(`user/${user._id}`, user)
// }

function updateFavTrips(user) {
    return httpService.put(`user/${user._id}`, user)
}

// function getReviewsByGuide(userId) {
//     return httpService.get(`user/${userId}`)
// }



async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}
async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    return _handleLogin(user)
}
async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
}


function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}