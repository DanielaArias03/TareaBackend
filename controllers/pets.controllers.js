import redis from "../config/redis.js";
import Pets from "../models/pets.js";
import jwt from "jsonwebtoken";

// Controlador para obtener todos los usuarios
export const GetAll = async (req, res) => {
  const petsKey = "pets";

  let cachedResponse = await redis.get(petsKey);
  if (cachedResponse) {
    cachedResponse = JSON.parse(cachedResponse);

    return res.status(200).json(cachedResponse);
  }
  const pets = await Pets.findAll();
  await redis.set(petsKey, JSON.stringify(pets));
  res.json(pets);
};

// Controlador para obtener los usuarios por ID
export const GetById = async (req, res) => {
  const pets = await Pets.findOne({
    where: { id: +req.params.id },
  });

  res.json(pets);
};

// Controlador para crear un usuario
export const createNew = async (req, res) => {
  const userToCreate = req.body;

  await Pets.create(userToCreate);

  res.status(201).json(userToCreate);
};

// Controlador para actualizar un usuario
export const UpdateById = async (req, res) => {
  await Pets.update(req.body, {
    where: {
      id: +req.params.id,
    },
  });

  const petUpdated = await Pets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  res.json(petUpdated);
};

// Controlador para eliminar un usuario por ID
export const DeleteById = async (req, res) => {
  const petToDelete = await Pets.findOne({
    where: {
      id: +req.params.id,
    },
  });

  await Pets.destroy({
    where: {
      id: +req.params.id,
    },
  });
  res.json(petToDelete);
};

// Controlador para autorización
export const auth = async (req, res) => {
  const { namepet, cedpet } = req.body;

  const pets = await Pets.findOne({
    where: {
      namepet: namepet,
      cedpet: cedpet,
    },
  });

  if (!pets) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ petId: pets.id }, "TareaBackend", {
    expiresIn: 60 * 60,
  });

  res.json({ token: token });
};
