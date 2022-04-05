export const state = () => {
    return {
        user: null
    }
} //This is the state object that can be used throughout the rest of the file.

export const getters = {
    isAuthenticated (state) {
        return state.user !== null
    }
} //Checks to see if the state object exists, which can indicate if the user is logged in.

export const mutations = {
    setUser (state, user) {
        state.user = user
    } 
} //sets the current user in the state object to the given user

export const actions = {
    async createUser ({ commit }, { username, email, password, pronouns, profilePicture, aboutMe }) {
        try {
            const res = await this.$axios.post('/api/users', {
                username, 
                email, 
                password, 
                pronouns, 
                profilePicture, 
                aboutMe
            })
            return 'created'
            
        } catch (e) {
            const status = e.response.status
            if (status === 409) {
                return 'conflict'
            } else {
                return 'failed'
            }
        }
    },

    async load ({ commit }) {
        try {
            const res = await this.$axios.get('/api/users')
            if (res.status === 200) {
                commit('setUser', res.data)
            }
        } catch (e) {
            commit('setUser', null)
        }
    },

    async loginUser ({ dispatch }, { username, password }) {
        const res = await this.$axios.put('/api/users/login', {
            username,
            password
        })
        if (res.status === 200) {
            await dispatch('load')
            return true
        } else {
            return false
        }
    },

    async logoutUser ({ commit }) {
        const res = await this.$axios.put('/api/users/logout')
        if (res.status === 200) {
            commit('setUser', null)
        }
    }
}