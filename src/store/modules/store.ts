import {Commit} from 'vuex';

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

const state: AuthState = {
    isAuthenticated: false,
    token: null,
};

const mutations = {
    setAuth(state: AuthState, token: string) {
        state.isAuthenticated = true;
        state.token = token;
    },
    clearAuth(state: AuthState) {
        state.isAuthenticated = false;
        state.token = null;
    },
};

const actions = {
    login({ commit }: { commit: Commit }) {
        const token = 'exampleToken';
        commit('setAuth', token);
    },
    logout({ commit }: { commit: Commit }) {
        commit('clearAuth');
    },
};

const getters = {
    isAuthenticated: (state: AuthState) => state.isAuthenticated,
    getToken: (state: AuthState) => state.token,
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
