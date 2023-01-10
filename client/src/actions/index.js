import axios from "axios";

export function  getVideoGames (){
    return async function (dispatch){
        var json = await axios.get ("http://localhost:3001/");
        return dispatch({
            type: "GET_GAMES",
            payload : json.data
        })
    }
}
