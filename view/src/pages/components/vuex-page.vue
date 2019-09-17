<template>
    <div>
        <p>vuex</p> 
        <p>store的state[count]: {{ count }}</p> 
        <p>store的mapGetters getSumArrlist: {{ getSumArrlist }}</p> 
        <button @click="addCountAction">addCountAction</button>
        <button @click="getMainAction">getMainAction</button>
        <hr>
        <p>store.student的state[stuName]: {{ stuName }}</p>
        <p>store.student的mapGetters getJobsArr: {{ getJobsArr }}</p> 
        <button @click="updateStuNameAction">updateStuNameAction</button>
        <button @click="getStuAction">getStuAction</button>
        <hr>
        <button @click="getOptionsAction">getOptionsAction</button>
    </div>
</template>
<script>
import * as types from '../../store/mutaion-types';
// 引入 vuex map
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    computed:{
        // 引用主模块的state
        ...mapState([
            'count',
        ]),
        // 引用 模块的state
        ...mapState('student', [
            'stuName',
            'age',
            'jobs',
        ]),
        // 引用getter
        ...mapGetters('student', ['getJobsArr']),
        ...mapGetters(['getSumArrlist']),
    },
    methods:{
        // 引用mutations
        ...mapMutations([
            types.ADD_COUNT,
        ]),
        ...mapMutations('student', [types.UPDATE_NAME]),
        // 引用action
        ...mapActions(['getStuInfo']),
        ...mapActions('student',['updateStuInfo']),
        ...mapActions('school',['getOptions']),
        getMainAction(){
            this.getStuInfo();
        },
        getStuAction(){
            this.updateStuInfo('wyj');
        },
        addCountAction(){
            let self = this;
            self[types.ADD_COUNT](2);
        },
        updateStuNameAction(){
            let self = this;
            self[types.UPDATE_NAME]('fucking')
        },
        getOptionsAction(){
            this.getOptions()
        }
    }
}
</script>