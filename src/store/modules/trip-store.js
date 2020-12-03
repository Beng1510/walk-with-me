import { tripService } from '../../services/trip-service.js';



export const tripStore = {
    strict: true,
    state: {
        isLoading: false,
        trips: [],
        filterBy: {
            name: "",
            type: "",
            // location: "",
            region: "",
        },
        isShowAll: false,
        showBy: null,
        currTrip: {}
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips
        },
        mountainTripsForDisplay(state) {
            // const newArray = state.trips.slice(0,4)
            if (state.showBy === "mountain" && state.isShowAll === true) {
                return state.trips.filter(trip => trip.type === "mountain")
            } else {
                const mountainTrips = state.trips.filter(trip => trip.type === "mountain")
                return mountainTrips.slice(0, 4)
            }
        },
        forestTripsForDisplay(state) {
            const forestTrips = state.trips.filter(trip => trip.type === "forest")
            return forestTrips.slice(0, 4)
        },
        cityTripsForDisplay(state) {
            const cityTrips =state.trips.filter(trip => trip.type === "city")
            return cityTrips.slice(0, 4)
        },
        difficultTripsForDisplay(state) {
            if (state.showBy === "Extreme" && state.isShowAll === true) {
                return state.trips.filter(trip => trip.difficulty >= 4)
            } else {
                const extremeTrips = state.trips.filter(trip => trip.difficulty >= 4)
                return extremeTrips.slice(0, 4)
            }
        },
        europeTripsForDisplay(state) {
            if (state.showBy === "Europe" && state.isShowAll === true) {
                return state.trips.filter(trip => trip.region === "Europe")
            } else {
                const europeTrips = state.trips.filter(trip => trip.region === "Europe")
                return europeTrips.slice(0, 4)

            }
        },
        getTripsByGuide(state) {
            return state.trips.filter(trip => trip.aboutGuide._id === state.guideId)
        },
        filterBy(state) {
            return state.filterBy
        }

    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setTrips(state, { trips }) {
            // console.log(' state.trips', state.trips);
            state.trips = trips
        },
        setIsLoading(state, payload) {
            state.isLoading = payload.isLoading
        },
        addTrip(state, { trip }) {
            state.trips.push(trip)
        },
        setGuideId(state, { guideId }) {
            state.guideId = guideId
        },
        updateTrip(state, { trip }) {
            const idx = state.trips.findIndex(prd => prd._id === trip._id);
            if (idx >= 0) state.trips.splice(idx, 1, trip);
        },
        showByParams(state, { showBy }) {
            state.isShowAll = !state.isShowAll
            state.showBy = showBy
        }
        // removeTrip(state, { tripId }) {
        //     const idx = state.trips.findIndex(trip => trip._id === tripId)
        //     state.trips.splice(idx, 1)
        // },
    },
    actions: {
        async loadTrips({ getters, commit }) {
            // commit({ type: 'setIsLoading', isLoading: true })
            // const trips = await tripService.query(state.filterBy)

            // console.log('getters.filterBy', getters.filterBy);
            // commit({ type: 'setFilterBy', filterBy })

            const trips = await tripService.query(getters.filterBy)

            // const trips = await tripService.query(filterBy)
            let types = {};
            trips.forEach(trip => {
                if (!types[trip.type]) types[trip.type] = trip.type
            });

            commit({ type: 'setTrips', trips })


            // commit({ type: 'setIsLoading', isLoading: false })

        },

        // async filterTrips({ commit, state }, { filterBy }) {

        //     console.log('filterBy at store:', filterBy)
        //     // const trips = await tripService.query(filterBy)
        //     // console.log('trips:', trips)
        //     commit({ type: 'setFilterBy', filterBy })

        //     // state.dispatch({ type:'loadTrips', filterBy }
        // },


        async saveTrip({ commit }, { trip }) {
            const savedTrip = await tripService.save(trip);
            commit({ type: 'addTrip', trip: savedTrip })
            
        },
        // async removeTrip({ commit }, payload) {
        //     await tripService.remove(payload.tripId)
        //     commit(payload)
        // },
        async updateTotalBooked({ commit }, { id, totalBooked }) {
            const trip = await tripService.getTripById(id);
            const tripCopy = JSON.parse(JSON.stringify(trip))
            tripCopy.totalBooked = totalBooked;
            // console.log('tripCopy',tripCopy);
            const savedTrip = await tripService.save(tripCopy);
            // console.log('savedTrip',savedTrip)
            commit({ type: 'updateTrip', trip: savedTrip })
        },
        async toggleFavs(context, { tripe }) {
            console.log('tripe:', tripe)

            // const trip = await tripService.save(id);
            // context.commit({ type: 'showByParams', showBy })
        },


    },

}