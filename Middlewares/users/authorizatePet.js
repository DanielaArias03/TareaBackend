import jwt from "jsonwebtoken";
import Pets from "../../models/pets.js";

const authorizatePet = async (req, res, next) => {
  const token = req.headers.authorization.split("Bearer ")[1];

  try {
    const { petId: petId } = jwt.verify(token, "TareaBackend");

    const petExists = await Pets.findOne({
      where: {
        id: +petId,
      },
    });

    if (!petExists) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: "Token invalid" });
  }
};

export default authorizatePet;
