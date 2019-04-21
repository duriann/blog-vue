import vue from 'vue'
import Vuex from 'vuex'
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
            state.category = payload.category
        }
    },  
    actions: {
      async getCategory({commit}){
           const res = await this.$http.get("/api/category/list");
            console.log("res", res);
            const { code, data } = res.data;
            if (code === 0) {
                // console.log(code, this.getTreeData(data));
               commit('getCategory')
            }
        
       }
    }
})
export default store