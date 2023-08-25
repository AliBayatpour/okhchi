import { Router } from "express";
import checkAuth from "../middlewares/check-auth";

const router = Router();
router.use(checkAuth);


router.get("", TodosController.getTodosByUserId);
router.post("", TodosController.createTodo);
router.put("", TodosController.updateTodo);
router.delete("/:id", TodosController.deleteTodo);

export default router;
