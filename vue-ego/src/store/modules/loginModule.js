//login用
export default  {
    namespaced: true,
    state: {
        username:'',
        token:''
    },
    mutations: {
        updateToken(state,token){
            state.token = token
        },
        clearToken(state){
            state.token = ''    
        },
        updateUsername(state,username){
            state.username = username
        },
        clearUsername(state){
            state.username = ''    
        }
    }
}