import { Commit } from 'vuex';

interface UserState {
    nickname: string;
    email: string;
    description: string;
    avatarPath: string;
}

const state: UserState = {
    nickname: 'admin',
    email: 'admin@gmail.com',
    description: 'best admin',
    avatarPath: 'http://www.gravatar.com/avatar?d=mm&s=140',
};

const mutations = {
    setUser(state: UserState, user: UserState) {
        Object.assign(state, user);
    },
    clearUser(state: UserState) {
        state.nickname = '';
        state.email = '';
        state.description = '';
        state.avatarPath = '';
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