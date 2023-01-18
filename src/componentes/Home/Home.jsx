import React from "react"
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {getVideoGames,sortByRating,sortAlphabetically,filterGamesGenre,orderCreated,getAllGenres} from "../../actions/index";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css"

export default function Home (){
    const dispatch = useDispatch ()
    const allGames  = useSelector ((state) => state.games)
    const allGenres = useSelector((state) => state.genres);
   
    const loading = useSelector((state) => state.loading);
    const [currentPage,setCurrentPage]= useState(1);
    const [gamesPerPage,setGamesPerPage]=useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = allGames?.slice(indexOfFirstGame,indexOfLastGame);
    const [header, setHeader] = useState("Explore all the Games");
    const [order, setOrder] = useState("Watch games");
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    
    useEffect (()=>{
        dispatch(getAllGenres());
        dispatch(getVideoGames())
    },[dispatch])


    function handleClick (e){
        e.preventDefault();
        dispatch(getVideoGames())
        setCurrentPage(1)
    }


    function handleGenre(e) {
        e.target.value === "all"
          ? dispatch(getVideoGames()) && setHeader("Explore all the Games")
          : dispatch(filterGamesGenre(e.target.value));
        setCurrentPage(1);
        setHeader(`Filtered by: ${e.target.value} genre`);
      }

    function handleRatingSort(e) {
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Sorted by: ${e.target.value}`);
        setHeader(`Sorted by: ${e.target.value}`);
      }

      function handleSort(e) {
        e.preventDefault();
        dispatch(sortAlphabetically(e.target.value));
        setCurrentPage(1);
        setOrder(`Sorted by: ${e.target.value}`);
        setHeader(`Sorted by: ${e.target.value}`); // se agrega estado local 'Sort' para que se pueda renderizar el ordenamiento desde la página 1
      }

      function handleOrderCreated(e) {
        e.target.value === "all"
          ? dispatch(getVideoGames())
          : dispatch(orderCreated(e.target.value));
        setCurrentPage(1);
        setHeader(`Filtered by Origin: ${e.target.value} games`);
      }










    return (
        <div className="header">
            
           <h1>{header}</h1>
           {loading && <h1 className="spinner2"></h1>}


              <SearchBar
                className="searchbar"
                setHeader={setHeader}
                setCurrentPage={setCurrentPage}></SearchBar>

           <div className="container">
            <div className="sort">
              <div className="rating">



              <label>Sort By:</label>
            <select onChange={(e) => handleRatingSort(e)}>
              <option hidden value="Rating">
                Rating
              </option>
              <option value="Highest to Lowest Rating">
                Highest to Lowest
              </option>
              <option value="Lowest to Highest Rating">
                Lowest to Highest
              </option>
            </select>

            <select onChange={(e) => handleSort(e)}>
              <option hidden value="Alphabetically">
                Alphabetically
              </option>
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
            </select>
              </div>
             
              <div className="origin">

            <label className="filter">Filter By:</label>
            
            
            <select onChange={(e) => handleOrderCreated(e)}>
              <option hidden value="origin">
                Origin
              </option>
              <option className="btnAll" value="all">
                All
              </option>
              <option className="btnApi" value="api">
                Api Existent
              </option>
              <option className="btnDb" value="db">
                Db created
              </option>
            </select>
            
            
            <select onChange={(e) => handleGenre(e)}>
              <option hidden value="genre">
                Genres
              </option>
              <option value="all">All</option>
              {allGenres?.map((ge) => (
                <option key={ge.id} value={ge.name}>
                  {ge.name}
                </option>
              ))}
            </select>
          </div>


          <div className="container-options">
            <label className="option"> Other options: </label>
            <button
              className="btnReset"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              Reset Games
            </button>
            <Link to="/videogame">
              <button className="btnCreate">Create new game</button>
            </Link>
          </div>
         </div>

         <div className="paginado">
                <Paginado
                gamesPerPage={gamesPerPage}
                allGames={allGames.length}
                paginado={paginado}/>
                </div>
                <div className="containerCards">

                {currentGames?.map((c)=>{
                    return(
                        <div className="cards" key={c.id}>
                            {/*Link to={"/home/" + c.id}*/}
                                <Card 
                                name={c.name} 
                                image={c.image} 
                                genres={c.genero} 
                                rating={c.rating}
                                id={c.id}/>
                            {/*/Link>*/}
                        </div>
                    )
                })}

                </div>
            </div>
           </div>
            
        
        )


        
        
    
}