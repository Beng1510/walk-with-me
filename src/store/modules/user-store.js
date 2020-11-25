import userService from '../../services/user-service.js'

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

export const userStore = {
    state: {
        users: [],
        loggedinUser: localLoggedinUser,
        favoriteTrips: [],
        isGuide: false
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
        isGuide(state) {
            return state.isGuide
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },
        // addReview(state, { review }) {
            // state.reviews.push(review)
        // },

    },
    actions: {
        async login(context, { userCred }) {
            const user = await userService.login(userCred);
            context.commit({ type: 'setUser', user })
            return user;
        },
        async signup(context, { userCred }) {
            const user = await userService.signup(userCred)
            context.commit({ type: 'setUser', user })
            return user;
        },
        async logout(context) {
            await userService.logout()
            context.commit({ type: 'setUsers', users: [] })
            context.commit({ type: 'setUser', user: null })
        },

        // async loadUsers(context) {
        //     const users = await userService.getUsers();
        //     context.commit({ type: 'setUsers', users })
        // },
        async updateUser(context, { user }) {
            user.favoriteTrips = await userService.updateFavTrips(user);
            context.commit({ type: 'setUser', user })
        },
        async addReview(context, { review }) {
            review = await userService.addReview(review)
            context.commit({ type: 'addReview', review })
            return review;
        },
    }
}