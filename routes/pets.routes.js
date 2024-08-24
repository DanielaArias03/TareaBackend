import { Router } from "express";
import {
  DeleteById,
  GetAll,
  GetById,
  UpdateById,
  createNew,
} from "../controllers/pets.controllers.js";
import checkById from "../Middlewares/users/checkId.js";
import petExists from "../Middlewares/users/petExist.js";

const petsRoutes = Router();

// Ruta para obtener todos los usuarios
petsRoutes.get("/", GetAll);

// Ruta para obtener un usuario por ID
petsRoutes.get("/:id", [checkById, petExists], GetById);

// Ruta para crear un usuario
petsRoutes.post("/", createNew);

// Ruta para modificar un usuario por ID
petsRoutes.patch("/:id", [checkById, petExists], UpdateById);

// Ruta para eliminar un usuario por ID
petsRoutes.delete("/:id", [checkById, petExists], DeleteById);

export default petsRoutes;
