import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';


export const Utilisateurs = sequelize.define('Utilisateurs', {

    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
       
    },
   
    email: {
        type: DataTypes.STRING(255),
        unique: true
        
    },
    motDePasse: {
        type: DataTypes.STRING(255),
       
    },
    
    role: {
        type: DataTypes.ENUM('admin', 'utilisateur'),
       
    }
  }, {
    timestamps: false, 
 
  });
  
  
  export default Utilisateurs;
  