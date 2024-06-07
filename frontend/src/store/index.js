import {createStore} from 'vuex'
import {getAPI} from '../api'

const store = createStore({
    state: {
        refreshToken: null,
        accessToken: null,
        user_id: null,
    },
    mutations: {
        updateStorage (state, {access, refresh, user_id}) {
            state.accessToken = access
            state.refreshToken = refresh
            state.user_id = user_id
        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
        }
    },
    getters: {
        authorized (state) {
            return state.accessToken != null
        }
    },
    actions: {
        userLogin (context, usercredentials) {
            return new Promise((resolve, reject) => {
                getAPI.post('/api/signin/', {
                    email: usercredentials.email,
                    password: usercredentials.password,
                }).then(response => {
                    console.log(response.data)
                    context.commit('updateStorage',{ access: response.data.tokens.access, refresh: response.data.tokens.refresh, user_id: response.data.id})
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        userLogout (context) {
            if (context.getters.authorized) {
                context.commit('destroyToken')
            } 
        }
    }
})

export default store