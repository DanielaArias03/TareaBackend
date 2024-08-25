import { Router } from "express";
import {
  DeleteById,
  GetAll,
  GetById,
  UpdateById,
  auth,
  createNew,
} from "../controllers/pets.controllers.js";
import checkById from "../Middlewares/users/checkId.js";
import petExists from "../Middlewares/users/petExist.js";
import { body } from "express-validator";
import validateDataMiddleware from "../Middlewares/validation/ValidateData.middleware.js";
import authorizatePet from "../Middlewares/users/authorizatePet.js";

const petsRoutes = Router();

// Ruta para obtener todos los usuarios
petsRoutes.get("/", GetAll);

// Ruta para obtener un usuario por ID
petsRoutes.get("/:id", [checkById, petExists], GetById);

// Ruta para crear un usuario
petsRoutes.post(
  "/",
  [
    body("namepet", "namepet not valid").exists().isString(),
    body("ownerpet", "ownerpet not valid").exists().isString(),
    body("cedpet", "cedpet invalid").exists().isString().isLength({
      min: 1,
      max: 5,
    }),
    validateDataMiddleware,
  ],
  createNew
);

// Ruta para modificar un usuario por ID
petsRoutes.post("/auth", auth);

// Ruta para modificar un usuario por ID
petsRoutes.patch("/:id", [checkById, petExists], UpdateById);

// Ruta para eliminar un usuario por ID
petsRoutes.delete("/:id", [checkById, petExists, authorizatePet], DeleteById);

export default petsRoutes;
