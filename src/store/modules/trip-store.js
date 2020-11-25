import { tripService } from '../../services/trip-service.js';


export const tripStore = {
    strict: true,
    state: {
        isLoading: false,
        trips: [],
        filterBy: {},
        currTrip: {}
    },
    getters: {
        tripsForDisplay(state) {
            return state.trips
        },
    },
    mutations: {
        setFilterBy(state, { filterBy }) {
            state.filterBy = filterBy
        },
        setTrips(state, { trips }) {
            state.trips = trips
        },
        setIsLoading(state, payload) {
            state.isLoading = payload.isLoading
        },
        addTrip(state, { trip }) {
            state.trips.push(trip)
        },
        updateTrip(state, { trip }) {
            const idx = state.trips.findIndex(prd => prd._id === trip._id)
            state.trips.splice(idx, 1, trip)
        },
        removeTrip(state, { tripId }) {
            const idx = state.trips.findIndex(trip => trip._id === tripId)
            state.trips.splice(idx, 1)
        },
    },
    actions: {
        async loadTrips({ commit, state }) {
            commit({ type: 'setIsLoading', isLoading: true })
            const trips = await tripService.query(state.filterBy)

            commit({ type: 'setTrips', trips })
            commit({ type: 'setIsLoading', isLoading: false })
        },
        async saveTrip({ commit }, { trip }) {
            const actionType = (trip._id) ? 'updateTrip' : 'addTrip';
            const savedTrip = await tripService.save(trip);
            commit({ type: actionType, trip: savedTrip })
            return savedTrip;
        },
        async removeTrip({ commit }, payload) {
            await tripService.remove(payload.tripId)
            commit(payload)
        },

    },

}