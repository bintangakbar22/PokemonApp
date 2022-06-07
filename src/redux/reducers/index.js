import { FETCH_LOGIN ,FETCH_POKE,FETCH_DATAPOKE} from "../types";
const initialState= {
    userData:{},
    isLogin:false,
    pokeData:{},
    pokeDetail:{}
};


const Reducer = (state = initialState,action) => {
    switch(action.type){
            case FETCH_LOGIN:
            return{
                ...state,
                userData:action.userData,
                isLogin:action.isLogin,
            };
            case FETCH_POKE:
            return{
                ...state,
                pokeData:action.pokeData,
            };
            case FETCH_DATAPOKE:
            return{
                ...state,
                pokeDetail:action.pokeDetail,
            };
            default:
                return state;
    }
};

export default Reducer

