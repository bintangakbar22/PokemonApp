import axios from "axios";
import {  FETCH_LOGIN ,FETCH_POKE,FETCH_DATAPOKE} from "../types";

  
export const fetchingLogin = (userData) => {
    return function(dispatch) {       
        dispatch({
            type :FETCH_LOGIN,
            userData:userData,
            isLogin:true,
        });
    };
}  


export const getAllPoke = () => {
    return async (dispatch) =>{
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon');
        console.log("data: ",res.data)

            dispatch({
                type :FETCH_POKE,
                pokeData:res.data}
               )
        
    }
}
export const getNextPoke = (url) => {
    return async (dispatch) =>{
        console.log(url)
        const res = await axios.get(url);
        console.log("data: ",res.data)

            dispatch({
                type :FETCH_POKE,
                pokeData:res.data}
               )
        
    }
}

export const getdataPoke = (url) => {
    return async (dispatch) =>{
        console.log(url)
        const res = await axios.get(url);
        console.log("data poke: ",res.data)
            dispatch({
                type :FETCH_DATAPOKE,
                pokeDetail:res.data}
               )
        
    }
}
// export function fetchingBookTest(dataB) {
//     return axios.get('http://code.aldipee.com/api/v1/books',
//             {
//                 headers:{
//                     "Authorization": `Bearer ${dataB}`
//                 }
//             }
//         );     
// } 

// export function fetchingBookDetailsTest(token,id) {
//     const ids = id
//     return axios.get('http://code.aldipee.com/api/v1/books/6231453513c01e6f8b566ece',
//         {
//                 headers:{
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );     
// } 

// export const getdataBookRec = (token) => {
//     return async (dispatch) =>{
//         const resTodos = await axios.get('http://code.aldipee.com/api/v1/books?limit=6',
//             {
//                 headers:{
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );
//         if (resTodos.data.results.length > 0){
//             dispatch({
//                 type :FETCHING_BOOK_REC,
//                 booksrec:resTodos.data.results,
//                 avgRating:resTodos.data.results.average_rating
//             }
//                )
//         }
//     }
// }

// export const getdataBookSpecific = (token,id) => {
//     return async (dispatch) =>{
//         const ids = id
//         const resTodosId = await axios.get('http://code.aldipee.com/api/v1/books/'+ids,
//         {
//                 headers:{
//                     "Authorization": `Bearer ${token}`
//                 }
//             }
//         );
        
//             dispatch({
//                 type :FETCHING_BOOK_SPESIFIC,
//                 bookSpesific:resTodosId.data}
//                )
        
//     }
// }


