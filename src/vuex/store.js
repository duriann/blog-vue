import vue from 'vue'
import Vuex from 'vuex'
import http from '@/utils/Http.js'
import {treeToList} from '@/utils/index'
vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isShowLogin: false,
        category: []
    },
    mutations: {
        showLogin(state) {
            state.isShowLogin = true;
        },
        hideLogin(state) {
            state.isShowLogin = false;
        },
        getCategory(state,payload){
            console.log('payload,',payload)
            state.category = payload.data
        }
    },  
    actions: {
      async getCategory({commit}){
            const res = await http.get("/category/list");
            const { code } = res.data;
            if (code === 0) {
                console.log('res.data', res.data);
               commit('getCategory',res.data)
            }
        
       }
    }
})
export default store