import * as types from '../mutaion-types';

const state = {
    stuName:"noname",
    age:18,
    jobs:['a','b','c']
};

const getters = {
    getJobsArr(state) {
        return state.jobs.join('+');
    },
};

const mutations = {
    [types.UPDATE_NAME](state, newVal) {
        state.stuName = newVal;
    },
};

const actions = {
    updateStuInfo({ state, commit, dispatch, rootState, rootGetters },val) {
        console.log(state)
        console.log(rootState)
        console.log(val)
        commit(types.UPDATE_NAME, val);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
