const axios = require ("axios");
const {YOUR_API_KEY}=process.env;
const { Videogame,Genres } = require("../../db")


const getApiInfo = async() => {
    try {
        const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`);
        const apiInfo = await apiUrl.data.results.map(ele=>{
            return{
                name:ele.name,
                id:ele.id,
                released:ele.released,
                image:ele.background_image,
                genero:ele.genres.map(elem=>{return{name:elem.name}}),
                rating:ele.rating,
                plataforma:ele.platforms.map((elem)=>{return{name:elem.platform.name};}),
            };
            
        });
       return apiInfo
    } catch (error) {
        console.log("sucedio un error en getApiinfo, controllers",error)
    }

};
//<-----------FUNCION OBTENER DATA BASE------------>//
const getDbInfo = async ()=>{
    try {
        return await Videogame.findAll({
            include:{model:Genres,
                     attributes:["name"],
                     throught:{attributes:[],},
                      
            },
        });
    } catch (error) {
        console.log("sucedio un error en getDbInfo", error)
    }
}

//<--------------------------UNIR INFORMACION-------------------------->//

const getAllVideoGames =async()=>{
    try {
        const apiInfoFunc= await getApiInfo();
        const dbInfoFunc= await getDbInfo();
        const allInfo= apiInfoFunc.concat(dbInfoFunc);
        return allInfo;
    } catch (error) {
        console.log("sucedio un error en getAllVideogames")
    }
}
//RUTA POR NOMBRE
const getGameByName = async (name) => {
    const apiURL = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}&page_size=15`)
    const gameData = await apiURL.data.results.map(el =>{
        return {
            id: el.id,
            name: el.name.join(),
            image: el.background_image,
            description: el.description,
            rating: el.rating,
            genres: el.genres.map(g => g.name).join(','),
            
        }
    }) 
    return gameData
}

module.exports = {
    getAllVideoGames,
    getDbInfo, 
    getApiInfo,
    getGameByName
}
