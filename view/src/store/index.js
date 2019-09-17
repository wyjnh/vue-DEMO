import Vue from 'vue';
import Vuex from 'vuex';

import * as types from './mutaion-types';
import student from './module/student';
import school from './module/school';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count:0,
        arrlist:[1,2,3,4]
    },
    mutations: {
        [types.ADD_COUNT](state, newVal) {
            state.count = newVal || 0;
        },
    },
    getters:{
        getSumArrlist(state){
            let sum = 0;
            state.arrlist.forEach(element => {
                sum += element
            });
            return sum
        }
    },
    actions: {
       getStuInfo(state){
           console.log("state中所有的数据")
           console.log(state)
           alert(JSON.stringify(state))
       } 
    },
    modules: {
        student,
        school
    }
});
