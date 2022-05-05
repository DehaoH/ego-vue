//公用
export default {
    namespaced: true,
    state:{
        page:'',
        search:'',
        vuexTotal:0
    
    },
    mutations: {
        setPage(state,page){
            state.page = page
        },
        setSearch(state,search){
            state.search = search
        },
        setTotal(state,vuexTotal){
            state.vuexTotal = vuexTotal
        }
    }

}