import {userService} from "../../services/user-service.js";

var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
// else (!)

export const userStore = {
    state: {
        users: [],
        loggedinUser: localLoggedinUser,
        favoriteTrips: [],
        // isGuide: false,
        reviews: []
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
        isGuide(state) {
            return state.isGuide
        },
        guidesForDisplay(state) {
            console.log('state at users',state);
            return state.users
        },
        reviews(state) {
            return state.reviews;
        },
    },
    mutations: {
        setUser(state, { user }) {
            state.loggedinUser = user;
        },
        setUsers(state, { users }) {
            state.users = users;
        },

        setReviews(state, { reviews }) {
            state.reviews = reviews;
        },
        addReview(state, { review }) {
            state.reviews.push(review)
        },
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

        async loadUsers(context) {
            const users = await userService.getUsers();
            console.log('users',users);
            context.commit({ type: 'setUsers', users })
        },
        async updateUser(context, { user }) {
            user.favoriteTrips = await userService.updateFavTrips(user);
            context.commit({ type: 'setUser', user })
        },


        async loadReviews(context, { guideId }) {
            // const review = await userService.getReviewsByGuide();
            const user = await userService.getUserById(guideId);
            console.log('user:', user)
            const reviews = user.guideInfo.reviews
            console.log('reviews:', reviews)
            context.commit({ type: 'setReviews', reviews })
        },
        // async addReview(context, { review }) {
        //     const user = await userService.getUserById(userId);
        //     review = await userService.addReview(review)
        //     user.guideInfo.reviews.push(review)
            // context.commit({ type: 'addReview', review })
        //     return review;
        // },
    }
}