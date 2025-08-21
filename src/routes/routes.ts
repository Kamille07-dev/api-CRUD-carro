import { Router } from "express";
import * as carController from "../controller/car-controller"

const router = Router();

router.get("/carros", carController.getCars);
router.post("/carros", carController.createCar); // exemplo para criar carro
router.delete("/carros/:id", carController.deleteCar); // exemplo para deletar carro
router.patch("/carros/:id", carController.updateCar); // exemplo para atualizar carro

export default router