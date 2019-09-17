import * as types from '../mutaion-types';

const state = {
    school:"荆州中学",
};

const getters = {
    //
};

const mutations = {
    //
};

const actions = {
    getOptions(options){
        console.log(options)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
