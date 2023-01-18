import{SORT_RATING,
    SORT_ALPHABETICALLY,
    FILTER_GAMES_GENRE,
    ORDER_CREATED,
    GET_ALL_GENRES,
    GET_GAMES_BY_NAME} from"../actions/index"


const initialState = {
    games :[],
    allGames:[],
    genres: []
}

function rootReducer (state = initialState,action) {
     switch (action.type){
        case "GET_GAMES":
            return{
                ...state,
                games:action.payload,
                allGames:action.payload
            }

            case GET_ALL_GENRES:
                return {
                    ...state,
                    genres: action.payload
                }

             case SORT_RATING:
                let sortRating = action.payload === 'Lowest to Highest Rating' ?
                state.games.sort((a,b) => {
                    if(a.rating > b.rating){
                        return 1;
                    }
                    if(a.rating < b.rating){
                        return -1;
                    }
                    return 0;
                }) : 
                state.games.sort((a,b) => {
                    if(a.rating > b.rating){
                        return -1;
                    }
                    if(a.rating < b.rating){
                        return 1;
                    }
                    return 0;
                })
                return {
                      ...state,
                     games: sortRating
                         }


            case SORT_ALPHABETICALLY:
                    let sort = action.payload === 'A - Z' ?
                    state.games.sort((a,b) => {
                    if(a.name > b.name){
                    return 1;
                    }
                     if(a.name < b.name){
                    return -1;
                    }
                    return 0;
                    }) :  state.games.sort((a,b) => {
                    if(a.name > b.name){
                    return -1;
                    }
                    if(a.name < b.name){
                    return 1;
                    }
                    return 0;
                    })
                    return {
                       ...state,
                       games: sort
                             }
  

            case FILTER_GAMES_GENRE:
                    const allGames = state.allGames
                    const gamesApi = allGames.filter(el => el.genres.includes(action.payload))
                    const gamesDb = allGames.filter((el) => {
                    for(let i = 0; i < el.genres.length; i++){
                    if(el.genres[i].name === action.payload){
                        return el
                       }
                    }
                     })
                    const allFiltered = gamesApi.concat(gamesDb)
                        return{
                        ...state,
                        games: allFiltered
                               }


            case ORDER_CREATED:
                    var aux;
                    if(action.payload === "db"){
                    aux = state.allGames.filter(ge => ge.createdAtDb)
                    if(!aux.length) aux= {dbError: 'No games found'}
                    } else {
                      aux = state.allGames.filter(ge=> !ge.createdAtDb)
                     }
                      return {
                          ...state,
                          games: aux
                            }  
                            case GET_GAMES_BY_NAME:
                      return {
                             ...state,
                             games: action.payload
                     }
            



            default:
                return state;
     }

    
}

export default rootReducer