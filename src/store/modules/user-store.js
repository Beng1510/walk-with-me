import { userService } from "../../services/user-service.js";
var defaultUser = {
    _id: "5fc531cfba5fd6d904aad38a",
    name: "Shuki Locali",
    favoriteTrips: [
        {
            _id: "5fc538bcba5fd6d904aad393",
            "name": "Switzerland Mountains",
            "date": 9898989
        },
        {
            _id: "5fc538bcba5fd6d904aad392",
            name: "Scotland Heights",
            date: 9898989
        },
        {
            _id: "5fc538bcba5fd6d904aad397",
            name: "Tuscany Vineyards",
            date: 9898989
        }
    ],
    profileImgUrl: "user1.jpeg",
    isGuide: false,
    guideInfo: {
        rate: "",
        description: "",
        lang: [],
        reviews: []
    }
}
var defaultGuide = {

    _id: "5fc531cfba5fd6d904aad389",
    name: "Puki Globali Grosman",
    favoriteTrips: [],
    profileImgUrl: "",
    isGuide: true,
    guideInfo: {
        rate: 4,
        description: "professional guide, with great vibes",
        lang: [
            "English",
            "Hebrew",
            "Welsh"
        ],
        reviews: [
            {
                id: "r101",
                txt: "A great guide to hike with..",
                rate: 5,
                reviewByUser: {
                    _id: "5fc531cfba5fd6d904aad38a",
                    userName: "Shuki Locali",
                    imgUrl: "img.jpg"
                }
            }
        ]
    }
}


var localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);
else {
    localLoggedinUser = defaultUser
}

export const userStore = {
    strict: true,
    state: {
        users: [],
        loggedinUser: localLoggedinUser,
        loggedinGuide: defaultGuide,
        favoriteTrips: [],
        // isGuide: false,
        reviews: [],
        guideRate: null
    },
    getters: {
        loggedinUser(state) {
            return state.loggedinUser
        },
        loggedinGuide(state) {
            return state.loggedinGuide
        },
        isGuide(state) {
            return state.isGuide
        },
        guidesForDisplay(state) {
            console.log('state:', state)
            // console.log('state at users',state);
            return state.users.filter(user => user.isGuide === true)
        },
        reviews(state) {
            return state.reviews
        },
        getGuideRate(state) {
            return state.guideRate
        }
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
        setGuideRate(state, { rate }) {
            state.guideRate = rate
        }
        // updateUser(state, { user }) {
        //     const idx = state.users.findIndex(prd => prd._id === user._id);
        //     if (idx >= 0) state.trips.splice(idx, 1, trip);
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

        async loadUsers(context) {
            const users = await userService.getUsers();
            context.commit({ type: 'setUsers', users })
        },
        async updateUser(context, { user }) {
            user = await userService.updateUser(user);
            context.commit({ type: 'setUser', user })
        },


        async loadReviews(context, { guideId }) {
            // const review = await userService.getReviewsByGuide();
            const user = await userService.getUserById(guideId);

            const reviews = user.guideInfo.reviews
            context.commit({ type: 'setReviews', reviews })
        },

        async saveReview({ commit }, { review, guideId, user }) {
            console.log('review, guideId, user', review, guideId, user);
            const guide = await userService.getUserById(guideId);
            console.log('guide before', guide);

            const sum = guide.guideInfo.reviews.reduce(
                (acc, item) => acc + item.rate,
                0
            );
            const avg = sum / guide.guideInfo.reviews.length;
            guide.guideInfo.rate = avg.toFixed(1)

            console.log('guide after', guide);
            // const updatedRateAtUser = await userService.updateUser(guide)
            const savedReview = await userService.saveReview(review, guide)
            commit({ type: 'addReview', review })
           
        },

        toggleFavs(context, { trip }) {
            const userCopy = JSON.parse(JSON.stringify(context.state.loggedinUser));
            let userFavs = userCopy.favoriteTrips;
            let isFav = userFavs.some((userFav) => userFav._id.includes(trip._id));
            if (isFav) {
                const idx = userFavs.findIndex((fav) => fav._id === trip._id);
                if (idx >= 0) {
                    userFavs.splice(idx, 1);
                }
            } else {
                userFavs.unshift({
                    date: trip.date,
                    name: trip.name,
                    _id: trip._id
                });
            }
            context.commit({ type: 'setUser', user: userCopy });
            context.dispatch({ type: 'updateUser', user: context.state.loggedinUser });
        },
        async getGuideRate(context, { tripGuideId }) {
           
            const user = await userService.getUserById(tripGuideId)
            

            const rate = user.guideInfo.rate;
            // console.log('rate at store,', rate);
            context.commit({ type: 'setGuideRate', rate });



        }
        // async addReview(context, { review }) {
        //     const user = await userService.getUserById(userId);
        //     review = await userService.addReview(review)
        //     user.guideInfo.reviews.push(review)
        // context.commit({ type: 'addReview', review })
        //     return review;
        // },
    }
}