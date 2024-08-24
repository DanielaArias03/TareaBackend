import { DataTypes } from "sequelize";
import { dbConnection } from "../config/db.js";

const Users = dbConnection.define("users", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.sync();
export default Users;

