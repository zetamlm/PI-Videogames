const { Router } = require('express');
const axios = require ("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Videogame,Genres} = require ("../db")
const {getAllVideoGames, getDbInfo, getApiInfo} = require("./controller.js/videogame");
const {YOUR_API_KEY}=process.env;



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//todos los juegos ruta
router.get("/", async (req, res) => {
    const { name } = req.query;
    let respuestaApi = await getAllVideoGames();
  
        if (name) {
          try {
          let gamesName = await respuestaApi.filter((el) =>
            el.name.toLowerCase().includes(name.toLowerCase())
          );
          gamesName.length //--> sigue abajo en la linea 13.
            ? res.status(200).send(gamesName)
            : res.status(404).send(`No se encontro el juego ${name}.`);
          }catch (error) {
              console.log("Sucedio un error en /videogames: ",error)
            }
          } else {
          res.status(200).send(respuestaApi);
        }
      
    })

    //ruta generos
    router.get("/genres",async(req,res)=>{
        

        const genApiUrl = await axios.get("https://api.rawg.io/api/genres?key=51a27d61a8bc4b4bbc1587ceaa8b3124");
        const genresApi = await genApiUrl.data.results.map (el => el.name)

        genresApi.forEach(el => {
            Genres.findOrCreate({
                where:{
                    name :el
                }
            })
        });
          
           const allGenres=await Genres.findAll();
           res.status(200).send(allGenres)
          
    
      })

      //RUTA POST
      router.post('/videogame', async (req,res,next) => {
        const {name,image ,description, released, rating, platforms, genres} = req.body
        try{
        let newGame = await Videogame.create({
            name, image, description, released, rating, platforms
        })
        let genInDb = await Genres.findAll({
            where: {
                name: genres
            }
        })
        await newGame.addGenre(genInDb)
        res.send('New game created')
    }catch(error){
    next(error)
    }
    })
//-----------ROUTE GET POR ID
router.get("/:id", async(req,res) => {
    try {
        const id = req.params.id
        const  respuestaApi = await getAllVideoGames();
        if(id){
        let videogameId = await respuestaApi.filter((el)=> el.id==id)
        videogameId.length
        ?res.status(200).json(videogameId)
        :res.status(404).send("i did not find that game")

        }
    } catch (error) {
        console.log("soy get/:id",error)
    }


    });

     
      

module.exports = router;
