import { createStore, Commit } from 'vuex';

interface UserState {
    username: string;
    email: string;
    description: string;
    avatarAddress: string;
}

const state: UserState = {
    username: 'admin',
    email: 'admin@gmail.com',
    description: 'best admin',
    avatarAddress: 'http://www.gravatar.com/avatar?d=mm&s=140',
};

const mutations = {
    setUser(state: UserState, user: UserState) {
        Object.assign(state, user);
    },
    clearUser(state: UserState) {
        state.username = '';
        state.email = '';
        state.description = '';
        state.avatarAddress = '';
    },
};

const actions = {
    updateUser({ commit }: { commit: Commit }, user: UserState) {
        commit('setUser', user);
    },
    exportUserState({ state }: { state: UserState }) {
        const userStateJSON = JSON.stringify(state);
        console.log(userStateJSON);
    },
};

const getters = {
    getUser: (state: UserState) => state,
};

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};