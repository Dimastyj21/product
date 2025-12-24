import { createStore } from 'vuex'
import counter from './modules/counter'

export const store = createStore({
  modules: { counter }
})