import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';
import auteurs from './auteurs.model.js';


export const Livres = sequelize.define('Livres', {

    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
       
    },
   
    titre: {
        type: DataTypes.STRING(255),
        
    },
    auteurId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: auteurs,
            key: 'idAuteur',
        },
       
    },
    
    annee: {
        type: DataTypes.DATE,
       
    },
    genre: {
        type: DataTypes.STRING(100),
       
    }
  }, {
    timestamps: false, 
 
  });
  
  
  export default Livres;
  