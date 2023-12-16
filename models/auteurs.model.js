import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';


export const Auteurs = sequelize.define('Auteurs', {

    idAuteur: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
   
    nom: {
        type: DataTypes.STRING(255),
        
    },
    biographie: {
        type: DataTypes.TEXT,
        allowNull: true
       
    }
  }, {
    timestamps: false, 
 
  });
  
  
  export default Auteurs;
  