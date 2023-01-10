const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue : DataTypes.UUIDV4,
      unique:true,
    },
  
    image:{
      type:DataTypes.STRING
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    released :{
      type:DataTypes.STRING(8)
    },
    rating:{
      type:DataTypes.DECIMAL(10,1),
      validate:{
        min:0,
        max:5
      }
    },
    ceatedInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    platforms :{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    }

  },{
//no estoy seguro
   timestamps:false,
  });
};
