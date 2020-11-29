import {userService} from "../../services/user-service.js";
var defaultUser = {
    _id: "u102",
    name: "Shuki Locali",
    favoriteTrips: [
        {
            _id: "t104",
            "name": "Switzerland Mountains",
            "date": 9898989
        },
        {
            _id: "t101",
            name: "Scotland Heights",
            date: 9898989
        },
        {
            _id: "t102",
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
    
        _id: "u101",
        name: "Puki Globali",
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
                _id: "u102",
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
        reviews: []
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
            // console.log('state at users',state);
            return state.users.filter(user => user.isGuide === true )
        },
        reviews(state){
            return state.reviews
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
            console.log('user at store',user);
            context.commit({ type: 'setUser', user })
        },


        async loadReviews(context, { guideId }) {
            // const review = await userService.getReviewsByGuide();
            const user = await userService.getUserById(guideId);
            const reviews = user.guideInfo.reviews
            context.commit({ type: 'setReviews', reviews })
        },

        async saveReview({ commit }, { review ,guideId } ) {
            const savedReview = await userService.saveReview(review ,guideId)
            commit({type: 'addReview', review})
        },

        toggleFavs(context, {trip}) {
            let userFavs = context.state.loggedinUser.favoriteTrips;
            let isFav = userFavs.map((userFav) => userFav._id.includes(trip._id));
            if (isFav.includes(true)) {
                const idx = userFavs.findIndex((fav) => fav._id === trip._id);
                if (idx >= 0) {
                    userFavs.splice(idx, 1);
              }
            } else {
              userFavs.unshift({
                date: trip.date,
                name: trip.name,
                _id: trip._id,
              });
            }
            context.dispatch({
                type: 'updateUser',
                user: context.state.loggedinUser
            })
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