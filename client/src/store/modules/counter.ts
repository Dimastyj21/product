export default {
    state: () => ({ count: 0}),
    mutations: {
        increment(state: any) {
            state.count++
        }
    },
    getters: {
        getCount(state: any) {
            return state.count
        }
    }
}