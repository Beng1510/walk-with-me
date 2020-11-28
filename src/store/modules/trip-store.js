import { tripService } from '../../services/trip-service.js';



export const tripStore = {
    strict: true,
    state: {
        isLoading: false,
        trips: [],
        filterBy: {
            name: "",
            type: "",
            location:"",
          },
        currTrip: {}
    },
    getters: {
        tripsForDisplay(state) {
            // console.log('state.trips',state.trips);
            return state.trips
        },
        mountainTripsForDisplay(state) {
            return state.trips.filter(trip => trip.type === "mountain" )
        },
        forestTripsForDisplay(state) {
            return state.trips.filter(trip => trip.type === "forest" )
        },
        seaTripsForDisplay(state) {
            return state.trips.filter(trip => trip.type === "seaside" )
        },
        cityTripsForDisplay(state) {
            return state.trips.filter(trip => trip.type === "city" )
        },
        filterBy(state) {
            return state.filterBy
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
        setTypes(state, { types }) {
            state.types = types
        },
        // addTrip(state, { trip }) {
        //     state.trips.push(trip)
        // },
        // updateTrip(state, { trip }) {
        //     const idx = state.trips.findIndex(prd => prd._id === trip._id)
        //     state.trips.splice(idx, 1, trip)
        // },
        // removeTrip(state, { tripId }) {
        //     const idx = state.trips.findIndex(trip => trip._id === tripId)
        //     state.trips.splice(idx, 1)
        // },
    },
    actions: {
        async loadTrips({getters, commit}) {
            // commit({ type: 'setIsLoading', isLoading: true })
            // const trips = await tripService.query(state.filterBy)
            const trips = await tripService.query(getters.filterBy)          
            let types = {};
            trips.forEach(trip => {
                if (!types[trip.type]) types[trip.type] = trip.type
            });
            // console.log('trips:', trips)
            // console.log('types:', types)

                commit({ type: 'setTrips', trips })
                commit({ type: 'setTypes', types })
           
                // commit({ type: 'setIsLoading', isLoading: false })

            commit({ type: 'setTrips', trips })
            // commit({ type: 'setIsLoading', isLoading: false })
        },

        async filterTrips({ commit, state },  {filterBy }) {
            
            // console.log('filterBy11111111:', filterBy)
            // const trips = await tripService.query(filterBy)
            // console.log('trips:', trips)
            commit({ type: 'setFilterBy', filterBy })

            // state.dispatch({ type:'loadTrips', filterBy })
            
        },
        

        // async saveTrip({ commit }, { trip }) {
        //     const actionType = (trip._id) ? 'updateTrip' : 'addTrip';
        //     const savedTrip = await tripService.save(trip);
        //     commit({ type: actionType, trip: savedTrip })
        //     return savedTrip;
        // },
        // async removeTrip({ commit }, payload) {
        //     await tripService.remove(payload.tripId)
        //     commit(payload)
        // },

    },

}