import Users from "../models/users.js";

// Controlador para obtener todos los usuarios
export const GetAllUsers = async (req, res) => {
  const users = await Users.findAll();

  res.json(users);
};

// Controlador para obtener los usuarios por ID
export const GetUserById = async (req, res) => {
  const user = await Users.findOne({
    where: { id: +req.params.id },
  });

  res.json(user);
};

// Controlador para crear un usuario
export const postUser = async (req, res) => {
  const userToCreate = req.body;

  await Users.create(userToCreate);

  res.status(201).json(userToCreate);
};

// Controlador para actualizar un usuario
export const UpdateById = async (req, res) => {
  await Users.update(req.body, {
    where: {
      id: +req.params.id,
    },
  });

  const userUpdated = await Users.findOne({
    where: {
      id: +req.params.id,
    },
  });

  res.json(userUpdated);
};

// Controlador para eliminar un usuario por ID
export const DeleteById = async (req, res) => {
  const userToDelete = await Users.findOne({
    where: {
      id: +req.params.id,
    },
  });

  await Users.destroy({
    where: {
      id: +req.params.id,
    },
  });
  res.json(userToDelete);
};
