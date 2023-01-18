import axios from "axios";
export const SORT_RATING = "SORT_RATING"
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY"
export const FILTER_GAMES_GENRE = "FILTER_GAMES_GENRE"
export const ORDER_CREATED  = "ORDER_CREATED"
export const GET_ALL_GENRES = "GET_ALL_GENRES"
export const GET_GAMES_BY_NAME = "GET_GAMES_BY_NAME"
export const LOADING = "LOADING"
export const LOADING_FINISH = "LOADING_FINISH"
export function  getVideoGames (){
    try {
        return async function (dispatch){
            var json = await axios.get ("http://localhost:3001/");
            return dispatch({
                type: "GET_GAMES",
                payload : json.data
            })
        }
    } catch (error) {
        console.log(error)
    }

    
}

export function getAllGenres(){
    try{
   return async function(dispatch){
       let json = await axios.get('/genres'); 
               return dispatch({
               type: GET_ALL_GENRES,
               payload: json.data
           });
       }
   } catch(error){
       console.log(error)
   }
}


export function sortByRating(payload){
    return {
        type: SORT_RATING,
        payload
    }
}

export function sortAlphabetically(payload){
    return {
        type: SORT_ALPHABETICALLY,
        payload
    }
}

export function filterGamesGenre(payload){
    console.log(payload)
    return {
        type: FILTER_GAMES_GENRE,
        payload
    }
 }
 export function orderCreated(payload){
    console.log(payload)
     return {
         type: ORDER_CREATED,
         payload
     }
 }
 export function getGamesByName(name) {
    return async function (dispatch){
        try{
            dispatch({type: LOADING})
            axios.get(`/videogames?name=${name}`).then(data => {
                dispatch({type: LOADING_FINISH})
                return dispatch({
                    type: GET_GAMES_BY_NAME,
                    payload: data.data
                })
            })

        } catch (error){
            console.log(error)
            return dispatch({
                type: GET_GAMES_BY_NAME,
                payload: [{msg: "Not found any games"}]
            })
        }
    }
}
 
