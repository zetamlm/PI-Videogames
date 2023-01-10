import React from "react";
 

export default function Card ({name,image,genres}) {
return (
    <div>
    <h3>{name}</h3>
    <h5><p>{genres[0].name ? genres.map((genre) => genre.name) : genres}</p></h5>
    <img src={image} alt ="img not found" width="200px" height="250px"/>
    </div>
    );
    


 }