import redis from "../config/redis.js";
import Owners from "../models/owners.js";


// Controlador para obtener todos los pets
export const GetAllOwners = async (req, res) => {
    const ownersKey = "owners";
  
    let cachedResponse = await redis.get(ownersKey);
    if (cachedResponse) {
      cachedResponse = JSON.parse(cachedResponse);
  
      return res.status(200).json(cachedResponse);
    }
    const owners = await Owners.findAll();
    await redis.set(ownersKey, JSON.stringify(owners));
    res.json(owners);
  };

  // Controlador para obtener los pets por ID
export const GetOwnerById = async (req, res) => {
    const owners = await Owners.findOne({
      where: { id: +req.params.id },
    });
  
    res.json(owners);
  };

// Controlador para crear un owner
export const createNewOwner = async (req, res) => {
  const userToCreate = req.body;

  await Owners.create(userToCreate);

  res.status(201).json(userToCreate);
};

// Controlador para autorización
export const login = async (req, res) => {
    const { nameowner, password } = req.body;
  
    const owner = await Owners.findOne({
      where: {
        nameowner: nameowner,
        password: password,
      },
    });
  
    if (!owner) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = jwt.sign({ ownerId: owner.id }, "TareaBackend", {
      expiresIn: 60 * 60,
    });
  
    res.json({ token: token });
  };

  // Controlador para actualizar un pet
export const UpdateOwnerById = async (req, res) => {
    await Owners.update(req.body, {
      where: {
        id: +req.params.id,
      },
    });
  
    const ownerUpdated = await Owners.findOne({
      where: {
        id: +req.params.id,
      },
    });
  
    res.json(ownerUpdated);
  };


  // Controlador para eliminar un pet por ID
export const DeleteOwnerById = async (req, res) => {
    const OwnerToDelete = await Owners.findOne({
      where: {
        id: +req.params.id,
      },
    });
  
    await Owners.destroy({
      where: {
        id: +req.params.id,
      },
    });
    res.json(OwnerToDelete);
  };