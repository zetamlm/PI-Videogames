import React from "react";



export default function Paginado ({gamesPerPage,allGames,paginado}){
const pageNumbers = []

for (let i=0; i <= Math.ceil(allGames/gamesPerPage); i++){
    pageNumbers.push(i+1)
}
return(
    <nav>
        <ul className="paginado">
            {
                pageNumbers?.map(number => (
                    <li className="li"  key={number}>
                    <button className="button"onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            
        </ul>
    </nav>
)

}