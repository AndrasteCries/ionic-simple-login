import { createStore } from 'vuex'
import store from './modules/store'
import user from './modules/user'

export default createStore({
    modules: {
        store,
        user
    }
})