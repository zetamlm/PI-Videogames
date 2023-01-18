import React from "react";
import{Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getVideoGames,getAllGenres } from "../../actions";
import { useEffect } from "react";
import "./Landing.css"


const LandingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getVideoGames());
      dispatch(getAllGenres());
    }, [dispatch]);
    return (
      <div className="containerLanding">
        <div className="miniContainer">
          <h1 className="tittleLanding">Proyect Individual VideoGames</h1>
          
          <Link to="/home">
            <button className="boxLanding">Start</button>
          </Link>
        </div>
      </div>
    );
  };
  export default LandingPage;