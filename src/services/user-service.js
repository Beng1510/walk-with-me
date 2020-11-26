import { httpService } from './http-service.js'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getUserById,
    updateUser
  
}
function getUsers() {
    return httpService.get('user')
}

function getUserById(userId) {
    return httpService.get(`user/${userId}`)
}

function updateUser(user) {
    return httpService.put(`user/${user._id}`, user)
}



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