import axios from 'axios'
import { httpService } from './http-service.js'
const baseUrl = 'http://localhost:3000';


export const userService = {
    login,
    logout,
    signup,
    getUserById,
    getUsers,
    saveReview,
    updateUser,
  
    // getReviewsByGuide 
}


async function getUserById(userId) {
    const res = await axios.get(`${baseUrl}/user/${userId}`)

    return res.data
    // return httpService.get(`user/${userId}`)
}

async function saveReview(review, guideId) {
    
    
    // console.log('review:Lest Time', review.txt)
    // console.log('review:Lest Time', review.rate)

    const user = await getUserById(guideId)
    console.log('user:', user)
    user.guideInfo.reviews.push(review)
    console.log('user:', user)

    updateUser(user);
    // const res = await axios.post(`${baseUrl}/user`, review)


    // return 
}

// async function getGuideById (guideId){
//     const res = await axios.get(`${baseUrl}/user/${guideId}`)
//     return res.data
// }

async function getUsers() {
    // return httpService.get('user')
    const res = await axios.get(`${baseUrl}/user`)
    return res.data
}
// function updateUser(user) {
//     return httpService.put(`user/${user._id}`, user)
// }

async function updateUser(user) {
    const res = await axios.put(`${baseUrl}/user/${user._id}`,user)
    return res.data 
    // return httpService.put(`user/${user._id}`, user)
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