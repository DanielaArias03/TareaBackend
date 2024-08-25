import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Pets = dbConnection.define("pets", {
  namepet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerpet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cedpet: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
});

Pets.sync();
export default Pets;
