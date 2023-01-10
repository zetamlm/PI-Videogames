import React, { Fragment } from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { Link } from "react-router-dom";
import {getVideoGames} from "../actions";
import Card from "./Card";

export default function Home (){
    const dispatch = useDispatch ()
    const allGames  = useSelector ((state) => state.games)

    useEffect (()=>{
        dispatch(getVideoGames())
    },[])


    function handleClick (e){
        e.preventDefault();
        dispatch(getVideoGames());
    }










    return (
        <div>
            <Link to="/videogame">Crear videoJuego</Link>
            <h1>Video Games</h1>
            <button onClick ={ e=>{handleClick(e)}}>
              volver a cargar los personajes
            </button>

            <div>
                <select>
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
               
               </select>

                <select>
                    <option value="ratingUp">Ascendent</option>
                    <option value="ratingdown">Descendent</option>

                </select>

                <select>
                    <option value="all">todos</option>
                    <option value="created">creados</option>
                    <option value="api">existente</option>
                </select>

                {allGames?.map((c)=>{
                    return(
                        <Fragment>
                            <Link to={"/home/" + c.id}>
                                <Card 
                                name={c.name} 
                                image={c.image} 
                                genres={c.genero} 
                                rating={c.rating}
                                id={c.id}/>
                            </Link>
                        </Fragment>
                    )
                })}

            
            </div>
        </div>
        )



        
        
    
}