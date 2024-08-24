import { Router } from "express";
import {
  DeleteById,
  GetAllUsers,
  GetUserById,
  UpdateById,
  postUser,
} from "../controllers/users.controllers.js";

const usersRoutes = Router();

// Ruta para obtener todos los usuarios
usersRoutes.get("/", GetAllUsers);

// Ruta para obtener un usuario por ID
usersRoutes.get("/:id", GetUserById);

// Ruta para crear un usuario
usersRoutes.post("/", postUser);

// Ruta para modificar un usuario por ID
usersRoutes.patch("/:id", UpdateById);

// Ruta para eliminar un usuario por ID
usersRoutes.delete("/:id", DeleteById);

export default usersRoutes;
